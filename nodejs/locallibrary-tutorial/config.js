module.exports = {
	port: process.env.PORT || 3000,
	credentials: {
		dbUser: process.env.DB_USER || 'undefined',
		dbPassword: process.env.DB_PASSWD || 'undefined'
	}
};
