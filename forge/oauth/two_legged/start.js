const forgeSDK = require("forge-apis");

const client_id = process.env.FORGE_CLIENT_ID;
const client_secret = process.env.FORGE_CLIENT_SECRET;
const autoRefresh = false;

const oauthClient = new forgeSDK.AuthClientTwoLegged(
    client_id, client_secret, ["data:read", "data:write", 'bucket:read', 'bucket:delete'],
    autoRefresh);
const bucketsClient = new forgeSDK.BucketsApi();

let credentials = null;

oauthClient.authenticate().then((credentials) => {
	console.log(credentials);
	bucketsClient.getBuckets({}, oauthClient, credentials)
	.then((res) => {
		console.log(res.body.items);
		console.log(res.body.items[0].bucketKey);
		bucketsClient.deleteBucket(res.body.items[0].bucketKey, oauthClient, credentials)
			.then((res) => {
				console.log(res);
			}, (err) => console.log(err));
	}, (err) => {
		console.log(err);
	});
}, (err) => {
    console.error(err);
});

