/**
 * @module dam/forms/DocumentReadEditForm
 * @extends module:alfresco/layout/HorizontalWidgets
 * @author Lubo Sladok
 */
define(["dojo/_base/declare",
        "dojo/io-query",
        "alfresco/lists/views/layouts/_MultiItemRendererMixin",
        "alfresco/layout/HorizontalWidgets"],

    function (declare, ioQuery, _MultiItemRendererMixin, HorizontalWidgets) {

        return declare([HorizontalWidgets], {

            widgetMarginLeft: 10,
            widgetMarginRight: 10,

            documentHeaderWidget: null,

            workflowDocumentWidget: null,

            postMixInProperties: function dam_forms_DocumentReadEditForm__postMixInProperties() {

                this.widgets = [
                    {
                        name: "alfresco/layout/VerticalWidgets",
                        widthPx: 1000,
                        config: {
                            widgetMarginLeft: 10,
                            widgetMarginRight: 10,
                            widgets: [
                                this.documentHeaderWidget,
                            ]
                        }
                    },
                    this.workflowDocumentWidget
                ];
                this.inherited(arguments);
            }

        });
    });
