const crypto = require("crypto");

module.exports.getHmac = function (passwd, phone) {
	const hmac = crypto.createHmac("sha512", phone);
	let data = hmac.update(passwd);
	const digest = data.digest("hex");
	return (digest);
}
