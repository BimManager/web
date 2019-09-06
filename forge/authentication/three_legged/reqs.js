const https = require("https");
const querystring = require("querystring");

const options = {
    method: "POST",
    hostname: "developer.api.autodesk.com",
    path: "/authentication/v1/authenticate",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

const postData = querystring.stringify(
    {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "data:read"
    }
);

const req = https.request(options, (res) => {
    res.on("data", (data) => {
        process.stdout.write(JSON.parse(data)["access_token"]);
    });
});

req.write(postData);
req.end();