const crypto = require("crypto");

/* md5 */
let hash = crypto.createHash("md5");
let data = hash.update("", "utf-8");
let digest = data.digest("hex");
console.log(digest);

/* whirlpool */
hash = crypto.createHash("whirlpool");
data = hash.update("", "utf-8");
digest = data.digest("hex");
console.log(digest);

/* sha1 */
hash = crypto.createHash("sha1");
data = hash.update("", "utf-8");
digest = data.digest("hex");
console.log(digest);
