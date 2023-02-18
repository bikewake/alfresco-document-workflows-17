/**
 *
 * @module dam/layout/WorkflowVerticalWidgets
 * @extends module:alfresco/layout/VerticalWidgets
 * @author Lubo Sladok
 */
define(["dojo/_base/declare",
        "alfresco/layout/VerticalWidgets",
        "alfresco/lists/views/layouts/_MultiItemRendererMixin",
        "dojo/_base/array"],
    function (declare, VerticalWidgets, _MultiItemRendererMixin, array) {

        return declare([VerticalWidgets], {

            i18nRequirements: [{i18nFile: "./i18n/workflow.properties"}],

            widgetMarginTop: 10,
            widgetMarginBottom: 10,

            packageWorkflowTasks: null,

            postMixInProperties: function dam_layout_WorkflowVerticalWidgets__postMixInProperties() {

                if (this.currentItem && this.currentItem.taskJson[this.packageWorkflowTasks]) {
                    this.widgets = array.map(this.currentItem.taskJson[this.packageWorkflowTasks],
                        function (item) {
                            this.alfLog("info", "Workflow active tasks item total items: " + item.jsonProgressTaskList.items.length);
                            array.forEach(item.jsonProgressTaskList.items, function (taskItem) {
                                this.alfLog("info", "Workflow active tasksId: " + taskItem.taskId);
                            }, this);
                            this.alfLog("info", "Workflow completed tasks total items: " + item.jsonCompletedTaskList.items.length);
                            array.forEach(item.jsonCompletedTaskList.items, function (taskItem) {
                                this.alfLog("info", "Workflow completed taskId: " + taskItem.taskId);
                            }, this);

                            if(item.jsonProgressTaskList.items.length == 0) {
                                return {
                                    name: "alfresco/layout/AlfTabContainer",
                                    config: {
                                        widgets: [
                                            {
                                                name: "dam/views/CompletedTaskListView",
                                                title: this.message("aikau_workflows.finished-tasks")+" (" + item.jsonCompletedTaskList.items.length + ")",
                                                config: {
                                                    currentData: item.jsonCompletedTaskList
                                                }
                                            }
                                        ]
                                    }
                                };
                            }

                            return {
                                name: "alfresco/layout/AlfTabContainer",
                                config: {
                                    widgets: [
                                        {
                                            name: "dam/views/ActiveTaskListView",
                                            title: this.message("aikau_workflows.active-tasks") + " (" + item.jsonProgressTaskList.items.length + ")",
                                            config: {
                                                currentData: item.jsonProgressTaskList
                                            }
                                        },
                                        {
                                            name: "dam/views/CompletedTaskListView",
                                            title: this.message("aikau_workflows.finished-tasks") + " (" + item.jsonCompletedTaskList.items.length + ")",
                                            config: {
                                                currentData: item.jsonCompletedTaskList
                                            }
                                        }
                                    ]
                                }
                            };
                        },
                        this);
                }
                if(!this.widgets || this.widgets.length == 0) {
                    this.widgets = [
                        {
                            name: "alfresco/html/Heading",
                            config: {
                                level: 3, // This will produce an <h2> element
                                label: "aikau_workflows.empty-workflows-list"
                            }
                        }
                    ];
                }

                this.inherited(arguments);
            }
        });
    });
