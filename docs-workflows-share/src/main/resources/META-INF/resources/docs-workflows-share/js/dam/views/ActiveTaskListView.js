/**
 *
 * @module dam/views/ActiveTaskListView
 * @extends module:alfresco/lists/views/AlfListView
 * @author Lubo Sladok
 */
define(["dojo/_base/declare",
        "alfresco/lists/views/AlfListView"],
    function (declare, AlfListView) {

        return declare([AlfListView], {

            widgetsForHeader: [
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "aikau_workflows.active-task-list",
                        sortable: false
                    }
                },
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "column.actions",
                        sortable: false
                    }
                }
            ],

            widgets: [
                {
                    name: "alfresco/lists/views/layouts/Row",
                    config: {
                        widgets: [
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    additionalCssClasses: "mediumpad",
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskDescription",
                                                renderSize: "large",
                                                label: "aikau_column.task.description.title",
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskTitle",
                                                renderSize: "large",
                                                label: "column.type",
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskCompletedBy",
                                                label: "column.assignedTo",
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Date",
                                            config: {
                                                propertyToRender: "taskDueDate",
                                                simple: true,
                                                format: "d. mmm. yyyy",
                                                label: "column.dueDate",
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskComment",
                                                label: "column.comment",
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskState",
                                                label: "column.status",
                                                renderSize: "small",
                                                renderOnNewLine: true
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Link",
                                            config: {
                                                linkLabel: "link.title.task-edit",
                                                publishTopic: "ALF_NAVIGATE_TO_PAGE",
                                                publishPayloadType: "PROCESS",
                                                publishPayloadModifiers: ["processCurrentItemTokens"],
                                                useCurrentItemAsPayload: false,
                                                publishGlobal: true,
                                                publishPayload: {
                                                    url: "task-edit?taskId={taskId}&referrer=tasks&myTasksLinkBack=true",
                                                    type: "PAGE_RELATIVE",
                                                    target: "CURRENT"
                                                },
                                                renderOnNewLine: true
                                            }
                                        },
                                        {
                                            name: "alfresco/renderers/Link",
                                            config: {
                                                linkLabel: "link.title.task-details",
                                                publishTopic: "ALF_NAVIGATE_TO_PAGE",
                                                publishPayloadType: "PROCESS",
                                                publishPayloadModifiers: ["processCurrentItemTokens"],
                                                useCurrentItemAsPayload: false,
                                                publishGlobal: true,
                                                publishPayload: {
                                                    url: "task-details?taskId={taskId}&referrer=tasks&myTasksLinkBack=true",
                                                    type: "PAGE_RELATIVE",
                                                    target: "CURRENT"
                                                },
                                                renderOnNewLine: true
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        });
    });


