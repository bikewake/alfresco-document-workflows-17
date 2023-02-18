if (page.url.args.nodeRef != null) {
    var nodeRef = page.url.args.nodeRef;

    model.jsonModel = {
        services: [
            "dam/services/DocumentWorkflowService"
        ],
        widgets: [
            {
                name: "alfresco/documentlibrary/AlfDocument",
                config: {
                    nodeRef: nodeRef,
                    rawData: true,
                    widthPx: 2200,
                    widgets: [
                        {
                            name: "dam/forms/DocumentReadEditForm",
                            config: {
                                documentHeaderWidget: {
                                    name: "alfresco/layout/HorizontalWidgets",
                                    config: {
                                        widgetMarginTop: 10,
                                        widgetMarginBottom: 10,
                                        widgets: [
                                            {
                                                name: "alfresco/html/Label",
                                                config: {
                                                    label: "id: " + nodeRef
                                                }
                                            },
                                            {
                                                name: "dam/layout/DocumentHeader"
                                            }
                                        ]
                                    }
                                },
                                workflowDocumentWidget: {
                                    name: "alfresco/layout/VerticalWidgets",
                                    config: {
                                        widgetMarginTop: 10,
                                        widgetMarginBottom: 10,
                                        widgets: [
                                            getTaskCollapsibleSection(),
                                            {
                                                name: "alfresco/preview/AlfDocumentPreview",
                                                config: {
                                                    size: 1200,
                                                    widgetsForPluginsOverrides: [
                                                        {
                                                            id: "PdfJs",
                                                            replace: true,
                                                            name: "alfresco/preview/PdfJs/PdfJs",
                                                            config: {}
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]
    };
} else {
    model.jsonModel = {
        widgets: [
            {
                name: "alfresco/header/Warning",
                config: {
                    warnings: [
                        {
                            message: "No document details provided",
                            level: 3
                        }
                    ]
                }
            }
        ]
    };
}
