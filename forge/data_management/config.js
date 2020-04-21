module.exports = {
	port: process.env.PORT || 3000,
	credentials: {
		client_id: process.env.FORGE_CLIENT_ID,
		client_secret: process.env.FORGE_CLIENT_SECRET,
		callback_url: process.env.FORGE_CALLBACK_URL
	},
	scopes: {
		internal: ["bucket:create", "bucket:read", "data:create", "data:read"],
		public: ["viewables:read"]
	}
};
