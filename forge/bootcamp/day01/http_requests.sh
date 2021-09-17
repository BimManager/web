#!/bin/bash
# to get a token with a specific scope
curl -v -X GET http://localhost:3000/api/forge/oauth/token

# to get a list of buckets
curl -v -X GET http://localhost:3000/api/forge/oss/buckets

# to get a list of objects in a specific bucket
curl -v -X GET 'http://localhost:3000/api/forge/oss/buckets?id=bucketId'

# to create a bucket with a particular bucket id
curl -v -X POST http://localhost:3000/api/forge/oss/buckets \
     -H 'Content-Type: application/json' \
     -d '{ "bucketKey": "bucket01" }'

# to upload a file to a bucket with key bucket00
curl -v -X POST http://localhost:3000/api/forge/oss/objects -F "fileToUpload=@server.js" -F "bucketKey=bucket00"

