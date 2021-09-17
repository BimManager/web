const ForgeSDK = require('forge-apis');

const client_id = process.env.FORGE_CLIENT_ID;
const client_secret = process.env.FORGE_CLIENT_SECRET;
if (!client_id || !client_secret) {
    console.log("client_id or client_secret is not defined");
    process.exit(1);
}

console.log(`${client_id} ${client_secret}`);

let autoRefresh = false;
const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
    client_id, client_secret, ["data:read", "data:write"], autoRefresh);
oAuth2TwoLegged.authenticate()
    .then((credentials) => { console.log(credentials) },
          (err) => { console.log(err) });
