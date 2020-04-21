const url = require('url');

function Handler() {
	this.callbacks = {};
	this.add = function(path, cb) {
		this.callbacks[path] = cb;
	};
	this.get = function(req, res) {
		const urlParts = url.parse(req.url);
		const cb = this.callbacks[urlParts.pathname];
		if (cb) {
			cb.call(this, req, res);
		}
		res.end('undefined');
	};
}

module.exports = Handler;
