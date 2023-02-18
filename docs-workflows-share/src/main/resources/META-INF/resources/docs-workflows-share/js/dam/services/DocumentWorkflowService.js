

define(["dojo/_base/declare",
       "service/constants/Default",
       "alfresco/core/NodeUtils",
       "alfresco/services/DocumentService"],
    function(declare, AlfConstants, NodeUtils, DocumentService) {

       return declare([DocumentService], {

      onRetrieveSingleDocumentRequest: function dam_services_DocumentAssocService__onRetrieveSingleDocumentRequest(payload) {
         if (!payload || !payload.nodeRef) {
            this.alfLog("warn", "A request was made to retrieve the details of a document but no 'nodeRef' attribute was provided", payload, this);
         } else {
            var nodeRef = NodeUtils.processNodeRef(payload.nodeRef),
                targetNodeUri = nodeRef.uri;

            // View mode and No-cache
            var params = "?view=";
            params += encodeURIComponent(payload.view || "browse");
            params += "&noCache=" + new Date().getTime() + "&includeThumbnails=true";

            var alfTopic = payload.alfResponseTopic || topics.GET_DOCUMENT;
            var url;
            if (payload.rawData === true || this.rawData === true) {
               url = AlfConstants.PROXY_URI + "document/workflow/doclib2/node/" + targetNodeUri + params;
            } else {
               url = AlfConstants.URL_SERVICECONTEXT + "components/documentlibrary/data/";
               if (payload.site) {
                  url += "site/" + encodeURIComponent(payload.site) + "/";
               }
               url += "node/" + targetNodeUri + params;
            }
            var config = {
               alfTopic: alfTopic,
               url: url,
               method: "GET",
               callbackScope: this,
               originalPayload: payload
            };
            this.serviceXhr(config);
         }
      }
   })

});
