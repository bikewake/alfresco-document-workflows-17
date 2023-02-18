/**
 *
 * @module dam/layout/DocumentHeader
 * @extends module:alfresco/layout/LeftAndRight
 * @author Lubo Sladok
 */
define(["dojo/_base/declare",
        "alfresco/layout/LeftAndRight",
        "alfresco/lists/views/layouts/_MultiItemRendererMixin"],
    function (declare, LeftAndRight, _MultiItemRendererMixin) {

        return declare([LeftAndRight], {

            widgetsLeft: [
                {
                    name: "alfresco/renderers/Property",
                    config: {
                        label: "label.modifier",
                        propertyToRender: "node.properties.cm:modifier"
                    }
                }
            ],
            widgetsRight: [
                {
                    name: "alfresco/renderers/Property",
                    config: {
                        label: "label.modified",
                        propertyToRender: "node.properties.cm:modified"
                    }
                }
            ]

        });
    });
