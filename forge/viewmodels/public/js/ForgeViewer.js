let viewerApp;

function launchViewer(urn) {
    if (viewerApp != null) {
        let thisviewer = viewerApp.getCurrentViewer();
        if (thisviewer) {
            thisviewer.tearDown();
            thisviewer.finish();
            thisviewer = null;
            $("#forgeViewer").empty();
        }
    }
    let options = {
    env: "AutodeskProduction",
    getAccessToken: getForgeToken
    }
    let documentId = "urn:" + urn;
    Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp = new Autodesk.Viewing.ViewingApplication("forgeViewer");
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function onDocumentLoadSuccess(doc) {
    let viewables = viewerApp.bubble.search({ "type": "geometry" });
    if (viewables.length == 0) {
        console.error("Document contains no viewable.")
        return ;
    }
    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.log("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
    
}

function onItemLoadFail(errorCode) {
    console.log("onItemLoadFail() - errorCode:" + errorCode);
}

function getForgeToken(callback) {
    jQuery.ajax({
        url: "/api/forge/oauth/token",
        success: (res) => {
            callback(res.access_token, res.expires_in);
        }
    })
}
