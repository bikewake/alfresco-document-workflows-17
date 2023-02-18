/**
 *
 * @module dam/layout/WorkflowTwister
 * @extends module:alfresco/layout/Twister
 * @author Lubo Sladok
 */
define(["dojo/_base/declare",
        "dojo/_base/array",
        "alfresco/layout/Twister",
        "alfresco/lists/views/layouts/_MultiItemRendererMixin"],
    function (declare, array, Twister, _MultiItemRendererMixin) {

        return declare([Twister], {

            headingLevel: 2,
            initiallyOpen: false,

            postMixInProperties: function dam_layout_WorkflowTwister__postMixInProperties() {

                var activeTasks = 0;
                var completedTasks = 0;
                if (this.currentItem && this.currentItem.taskJson.activeWorkflowTasks) {
                    array.forEach(this.currentItem.taskJson.activeWorkflowTasks, function (taskItems) {
                        activeTasks += taskItems.jsonProgressTaskList.items.length;
                        completedTasks += taskItems.jsonCompletedTaskList.items.length;
                    }, this);
                }
                if (this.currentItem && this.currentItem.taskJson.completedWorkflowTasks) {
                    array.forEach(this.currentItem.taskJson.completedWorkflowTasks, function (taskItems) {
                        completedTasks += taskItems.jsonCompletedTaskList.items.length;
                    }, this);
                }
                this.label = this.message("aikau_workflows.tasks") + " (" + activeTasks + "/" + completedTasks + ")";

                this.inherited(arguments);
            }

        });
    });
