/*
 *	oss.js
 */

const fs = require("fs");
const express = require("express");
const multer = require("multer");
const { BucketApi, ObjectsApi, PostBucketsPayload } = require("forge-apis");

const { getClient, getInternalToken } = require("./common/oauth");
const config = require("../config");

let router = express.Router();

router.use(async (req, res, next) => {
    const token = await getInternalToken();
    req.oauth_token = token;
    req.oauth_client = getClient();
    next();
});

router.get("/buckets", async (req, res, next) =>
	   {
	       const bucket_name = req.query.id;
	       if (!bucket_name || bucket_name === "#") {
		   try
		   {
		       const buckets = await new BucketApi().getBuckets({ limit: 64 },
							     req.oauth_client,
							     req.oauth_token);
		       res.json(buckets.body.items.map((bucket) =>
						       {
							   return
							   {
							       id: bucket.bucketKey,
							       text: bucket.bucketKey.replace(
								   config.credentials.client_id.toLowerCase() + "-", ""),
							       type: "bucket",
							       children: true
							   };
						       }));
		   }
		   catch(err)
		   {
		       next(err);
		   }
	       }
	       else
	       {
		   try
		   {
		       const objects = await new ObjectsApi().getObjects(
			   bucket_name, {}, req.oauth_client,
			   res.json(objects.body.items.map((object) =>
							   {
							       return
							       {
								   id: Buffer.from(object.objectId).toString("base64"),
								   text: object.objectKey,
								   type: "object",
								   children: false
							       };
							   })));
		   }
		   catch(err)
		   {
		       next(err);
		   }
	       }
	   });
				
