package org.bikewake.alfresco.rhino;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.jscript.ScriptUtils;
import org.alfresco.repo.processor.BaseProcessorExtension;
import org.alfresco.repo.workflow.WorkflowModel;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.security.PersonService;
import org.alfresco.service.cmr.workflow.*;
import org.alfresco.service.namespace.QName;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.extensions.surf.util.I18NUtil;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class DocumentWorkflowService extends BaseProcessorExtension {

    private static final Log LOGGER = LogFactory.getLog(new Object() {
    }.getClass().getEnclosingClass());

    private static final String TASK_ID = "taskId";
    private static final String TASK_DESCRIPTION = "taskDescription";
    private static final String TASK_TITLE = "taskTitle";
    private static final String TASK_DUE_DATE = "taskDueDate";
    private static final String TASK_COMPLETION_DATE = "taskCompletionDate";
    private static final String TASK_COMPLETED_BY = "taskCompletedBy";
    private static final String TASK_OUTCOME = "taskOutcome";
    private static final String TASK_COMMENT = "taskComment";
    private static final String TASK_STATE = "taskState";

    private static final String ITEMS = "items";
    private static final String ACTIVE_WORKFLOW_TASKS = "activeWorkflowTasks";
    private static final String COMPLETED_WORKFLOW_TASKS = "completedWorkflowTasks";
    private static final String JSON_PROGRESS_TASK_LIST = "jsonProgressTaskList";
    private static final String JSON_COMPLETED_TASK_LIST = "jsonCompletedTaskList";
    private static final String TASK_OUTCOME_MESSAGE_PREFIX = "workflowtask.outcome.";
    private static final String WORKFLOW_PRIORITY = "workflowPriority";
    private static final String TASK_PRIORITY = "taskPriority";

    private WorkflowService workflowService;
    private NodeService nodeService;
    private PersonService personService;

    private ScriptUtils scriptUtils;

    public String getNodeWorkflows(String jsNodeRef) {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("assoc String jsNodeRef: " + jsNodeRef);
        }
        NodeRef nodeRef = new NodeRef(jsNodeRef);
        final JSONObject json = new JSONObject();
        json.put(ACTIVE_WORKFLOW_TASKS, buildWorkflowJson(workflowService.getWorkflowsForContent(nodeRef, true), true));
        json.put(COMPLETED_WORKFLOW_TASKS, buildWorkflowJson(workflowService.getWorkflowsForContent(nodeRef, false), false));
        return json.toJSONString();
    }

    private JSONArray buildWorkflowJson(List<WorkflowInstance> workflows, boolean active) {
        final JSONArray jsonWorkflows = new JSONArray();
        for (WorkflowInstance workflow : workflows) {
            WorkflowTaskQuery taskQuery = new WorkflowTaskQuery();
            taskQuery.setProcessId(workflow.getId());
            taskQuery.setTaskState(WorkflowTaskState.IN_PROGRESS);
            taskQuery.setActive(active);
            taskQuery.setOrderBy(new WorkflowTaskQuery.OrderBy[]{WorkflowTaskQuery.OrderBy.TaskCreated_Desc});
            final JSONObject jsonWorkflow = new JSONObject();
            jsonWorkflow.put(JSON_PROGRESS_TASK_LIST, buildJsonWorkflowTask(taskQuery, true));
            taskQuery.setTaskState(WorkflowTaskState.COMPLETED);
            jsonWorkflow.put(JSON_COMPLETED_TASK_LIST, buildJsonWorkflowTask(taskQuery, false));
            jsonWorkflow.put(WORKFLOW_PRIORITY, workflow.getPriority());
            jsonWorkflows.put(jsonWorkflow);
        }
        return jsonWorkflows;
    }

    private JSONObject buildJsonWorkflowTask(WorkflowTaskQuery taskQuery, boolean inProgress) {
        List<WorkflowTask> workflowTasks = workflowService.queryTasks(taskQuery, true);
        final JSONArray jsonTasks = buildTaskJson(workflowTasks, inProgress);
        final JSONObject jsonTaskList = new JSONObject();
        jsonTaskList.put(ITEMS, jsonTasks);
        return jsonTaskList;
    }

    private JSONArray buildTaskJson(List<WorkflowTask> workflowTasks, boolean inProgress) {
        final JSONArray jsonTasks = new JSONArray();
        for (WorkflowTask workflowTask : workflowTasks) {
            JSONObject jsonTask = new JSONObject();
            jsonTask.put(TASK_ID, workflowTask.getId());
            jsonTask.put(TASK_DESCRIPTION, workflowTask.getDescription());
            jsonTask.put(TASK_TITLE, workflowTask.getTitle());
            if (workflowTask.getProperties().get(WorkflowModel.PROP_DUE_DATE) != null) {
                jsonTask.put(TASK_DUE_DATE, scriptUtils.toISO8601((Date) workflowTask.getProperties().get(WorkflowModel.PROP_DUE_DATE)));
            }
            if (workflowTask.getProperties().get(WorkflowModel.PROP_COMPLETION_DATE) != null) {
                jsonTask.put(TASK_COMPLETION_DATE, scriptUtils.toISO8601((Date) workflowTask.getProperties().get(WorkflowModel.PROP_COMPLETION_DATE)));
            }
            jsonTask.put(TASK_STATE, workflowTask.getProperties().get(WorkflowModel.PROP_STATUS));
            Serializable outcome = getOutcome(workflowTask);
            if (outcome != null) {
                jsonTask.put(TASK_OUTCOME, outcome);
            }
            if (inProgress || outcome != null) {
                jsonTask.put(TASK_COMPLETED_BY, getPersonName(workflowTask.getProperties().get(ContentModel.PROP_OWNER)));
            }
            jsonTask.put(TASK_COMMENT, workflowTask.getProperties().get(WorkflowModel.PROP_COMMENT));
            jsonTask.put(TASK_PRIORITY, workflowTask.getProperties().get(WorkflowModel.PROP_PRIORITY));

            jsonTasks.put(jsonTask);
        }
        return jsonTasks;
    }

    private Serializable getPersonName(Serializable nameSer) {
        if (!(nameSer instanceof String)) {
            return null;
        }
        String name = (String) nameSer;
        StringBuffer personName = new StringBuffer();
        if (personService.personExists(name)) {
            NodeRef person = personService.getPerson(name);
            Map<QName, Serializable> properties = nodeService.getProperties(person);
            personName.append(properties.get(ContentModel.PROP_FIRSTNAME));
            personName.append(' ');
            personName.append(properties.get(ContentModel.PROP_LASTNAME));
        }
        return personName.toString();
    }

    private Serializable getOutcome(WorkflowTask task) {
        String outcomeLabel = null;

        // there will only be an outcome if the task is completed
        if (task.getState().equals(WorkflowTaskState.COMPLETED)) {
            String outcomeId = (String) task.getProperties().get(WorkflowModel.PROP_OUTCOME);
            if (outcomeId != null) {
                // find the transition with the matching id and get the label
                WorkflowTransition[] transitions = task.getDefinition().getNode().getTransitions();
                for (WorkflowTransition transition : transitions) {
                    if (transition.getId() != null && transition.getId().equals(outcomeId)) {
                        outcomeLabel = transition.getTitle();
                        break;
                    }
                }
                if (outcomeLabel == null) {
                    String translatedOutcome = I18NUtil.getMessage(TASK_OUTCOME_MESSAGE_PREFIX + outcomeId);
                    if (translatedOutcome != null) {
                        outcomeLabel = translatedOutcome;
                    } else {
                        outcomeLabel = outcomeId;
                    }
                }
            }
        }

        return outcomeLabel;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    public void setNodeService(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    public void setPersonService(PersonService personService) {
        this.personService = personService;
    }

    public void setScriptUtils(ScriptUtils scriptUtils) throws BeansException {
        this.scriptUtils = scriptUtils;
    }
}
