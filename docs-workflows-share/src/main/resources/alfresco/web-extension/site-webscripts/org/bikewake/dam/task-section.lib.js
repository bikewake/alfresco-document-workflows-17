
function getTaskCollapsibleSection() {
    return {
        name: "dam/layout/WorkflowTwister",
        config:
            {
                widgets:
                    [
                        {
                            name: "alfresco/buttons/AlfButton",
                            align: "right",
                            config:
                                {
                                    label: "aikau_workflows.start-new-workflow",
                                    additionalCssClasses: "primary-call-to-action",
                                    publishTopic: "ALF_POST_TO_PAGE",
                                    publishPayload: {
                                        url: "start-workflow",
                                        parameters: {
                                            selectedItems: nodeRef
                                        }
                                    },
                                    style: {
                                        marginTop: "10px",
                                        marginBottom: "10px"
                                    }
                                }
                        },
                        {
                            name: "alfresco/html/Heading",
                            config: {
                                level: 2, // This will produce an <h2> element
                                label: "aikau_workflows.active-workflow-list"
                            }
                        },
                        {
                            name: "dam/layout/WorkflowVerticalWidgets",
                            config: {
                                packageWorkflowTasks: "activeWorkflowTasks"
                            }
                        },
                        {
                            name: "alfresco/html/Heading",
                            config: {
                                level: 2, // This will produce an <h2> element
                                label: "aikau_workflows.finished-workflow-list"
                            }
                        },
                        {
                            name: "dam/layout/WorkflowVerticalWidgets",
                            config: {
                                packageWorkflowTasks: "completedWorkflowTasks"
                            }
                        }
                    ]
            }
    };
}
