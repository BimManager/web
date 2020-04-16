module.exports = {
	port: process.env.PORT || 3000,
	credentials: {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		callback_url: process.env.FORGE_CALLBACK_URL
	},
	scopes: {
		internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
		public: ['viewables:read']
	}
};
