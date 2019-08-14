const forgeSDK = require("forge-apis");

const client_id = process.env.FORGE_CLIENT_ID;
const client_secret = process.env.FORGE_CLIENT_SECRET;
const autoRefresh = false;

const FORGE_CLIENT_ID="bKJaO9pXn9yPYyQGGUteHGswhNABn96w";
const FORGE_CLIENT_SECRET="rStRbj5zOfYoAmFM";

//console.log(client_id);
//console.log(client_secret);
console.log(FORGE_CLIENT_ID);
console.log(FORGE_CLIENT_SECRET);

const oAuth2TwoLegged = new forgeSDK.AuthClientTwoLegged(
    //client_id, client_secret, ["data:read", "data:write"],
    FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, ["data:read", "data:write"],
    autoRefresh);

oAuth2TwoLegged.authenticate().then((credentials) => {
    console.log(credentials)
    let token = credentials.access_token;
    console.log(token);
}, (err) => {
    console.error(err);
});



