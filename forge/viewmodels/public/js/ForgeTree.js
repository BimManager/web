$(document).ready(() => {
    prepareAppBucketTree();
    $("#refreshBuckets").click(() => {
        $("#appBuckets").jstree(true).refresh();
    })
});

$("#createNewBucket").click(() => {
    createNewBucket();
});

$("#createBucketModal").on("shown.bs.modal", () => {
    $("#newBucketKey").focus();
});

$("#hiddenUploadField").change(() => {
    let node = $("#appBuckets").jstree(true).get_selected(true)[0];
    let _this = this;
    if (_this.files.length == 0) return ;
    let file = _this.files[0];
    switch (node.type) {
        case "bucket":
            let formData = new FormData();
            formData.append("fileToUpload", file);
            formData.append("bucketKey", node.id);
            $.ajax({
                url: "/api/forge/oss/objects",
                data: formData,
                processData: false,
                processType: false,
                type: "POST",
                success: (data) => {
                    $("#appBuckets").jstree(true).refresh_node(node);
                    _this.value = "";
                }
            })
        break;
    }
});

function createNewBucket() {
    let bucketKey = $("#newBucketKey").val();
    let policyKey = $("#newBucketPolicyKey").val();
    jQuery.post({
        url: "/api/forge/oss/buckets",
        contentType: "applicatoin/json",
        data: JSON.stringify({ "bucketKey": bucketKey, "policyKey": policyKey }),
        success: (res) => {
            $("#appBuckets").jstree(true).refresh();
            $("#createBucketModal").modal("toggle");
        },
        error: (err) => {
            if (err.status == 409)
                alert("Bucket already exists - 409: Duplicated");
            console.log(err);
        }   
    });
};

function prepareAppBucketTree() {
    $("#appBuckets").jstree({
        "core": {
            "themes": { "icons": true },
            "data": {
                "url": "/api/forge/oss/buckets",
                "dataType": "json",
                "multiple": false,
                "data": (node) => {
                    return { "id": node.id };
                }
            }
        },
        "types": {
            "default": {
                "icon": "glyphicon glyphicon-question-sign"
            },
            "#": {
                "icon": "glyphicon glyphicon-cloud"
            },
            "bucket": {
                "icon": "glyphicon glyphicon-folder-open"
            },
            "object": {
                "icon": "glyphicon glyphicon-file"
            }
        },
        "plugins": ["types", "state", "sort", "contextmenu"],
        contextmenu: { items: autodeskCustomMenu }
    }).on("loaded.jstree", () => {
        $("#appBuckets").jstree("open_all");
    }).bind("activate_node.jstree", (evt, data) => {
        if (data != null && data.mode != null && data.node.type == "object") {
            $("forgeViewer").empty();
            let urn = data.node.id;
            getForgeToken((access_token) => {
                jQuery.ajax({
                    url: "https://developer.api.autodesk.com/modelderivative/v2/designdata" 
                    + urn + "/manifest",
                    headers: {"Authorization": "Bearer" + access_token },
                    success: (res) => {
                        if (res.status === "success") launchViewer(urn);
                        else $("$forgeViewer").html("The translation job still running" + 
                        res.progress + ". Please try again in a moment");
                    },
                    error: (err) => {
                        let msgButton = "This file is not translated yet." +
                        '<button class="btn btn-xs btn-info" onclick="translateObject()">' +
                        '<span class="glyphicon glyphicon-eye-open"></span>' +
                        'Start translation</button>'
                        $("#forgeViewer").html(msgButton);
                    }
                });
            })
        }
    });
};

function autodeskCustomMenu(autodeskNode) {
    let items;

    switch (autodeskNode.type) {
        case "bucket":
            items = {
                uploadFile: {
                    label: "Upload file",
                    action: () => {
                        uploadFile();
                    },
                    icon: "glyphicon glyphicon-cloud-upload"
                }
            };
        break;
        case "object":
            items = {
                translateFile: {
                    label: "Translate",
                    action: () => {
                        let treeNode = $("#appBuckets").jstree(true).get_selected(true)[0];
                        translateObject(treeNode);
                    },
                    icon: "glyphicon glyphicon-eye-open"
                }
            };
        break ;
    }
    return (items);
}

function uploadFile() {
    $("#hiddenUploadField").click();
}

function translateObject(node) {
    $("#forgeViewer").empty();
    if (node == null) node = $("#appBuckets").jstree(true).get_selected(true)[0];
    let bucketKey = node.parents[0];
    let objectKey = node.id;
    jQuery.post({
        url: "/api/forge/modelderivative/jobs",
        contentType: "application/json",
        data: JSON.stringify({ "bucketKey": bucketKey, "objectName": objectKey }),
        success: (res) => {
            $("#forgeViewer").html("Translation started! Please try again in a moment.");
        }
    })
}