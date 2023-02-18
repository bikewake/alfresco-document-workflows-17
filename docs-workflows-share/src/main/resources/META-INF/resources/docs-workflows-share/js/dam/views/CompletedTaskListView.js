/**
 *
 * @module dam/views/CompletedTaskListView
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
                        label: "column.type",
                        sortable: false
                    }
                },
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "column.completedBy",
                        sortable: false
                    }
                },
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "column.dateCompleted",
                        sortable: false
                    }
                },
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "column.outcome",
                        sortable: false
                    }
                },
                {
                    name: "alfresco/lists/views/layouts/HeaderCell",
                    config: {
                        label: "column.comment",
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
                                                propertyToRender: "taskTitle"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    additionalCssClasses: "mediumpad",
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskCompletedBy"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    additionalCssClasses: "mediumpad",
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Date",
                                            config: {
                                                propertyToRender: "taskCompletionDate",
                                                simple: true,
                                                format: "d. mmm. yyyy"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    additionalCssClasses: "mediumpad",
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskOutcome"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                name: "alfresco/lists/views/layouts/Cell",
                                config: {
                                    additionalCssClasses: "mediumpad",
                                    widgets: [
                                        {
                                            name: "alfresco/renderers/Property",
                                            config: {
                                                propertyToRender: "taskComment"
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


