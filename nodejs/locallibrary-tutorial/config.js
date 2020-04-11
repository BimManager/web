module.exports = {
	port: process.env.PORT || 3000,
	credentials: {
	},
	db: {
		mongoDB: `mongodb+srv://${process.env.DB_USER}:\
${process.env.DB_PASSWD}@cluster0-2aice.mongodb.net/\
local_library?retryWrites=true&w=majority`
	}
};
