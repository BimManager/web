const fs = require("fs");
const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const passwd = "crypto";

/*
** Symmetric cryptography
** The same key is used for encryption and decryption.
*/

function sym_encrypt(msg) {
	const cipher = crypto.createCipher(algorithm, passwd);
	let encrypted = cipher.update(msg, "utf-8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
}

function sym_decrypt(msg) {
	const decipher = crypto.createDecipher(algorithm, passwd);
	let decrypted = decipher.update(msg, "hex", "utf-8");
	decrypted += decipher.final("utf-8");
	return decrypted;
}

const plaintext = "foo";
console.log(plaintext);
let encrypted = sym_encrypt(plaintext);
console.log(encrypted);
let decrypted = sym_decrypt(encrypted);
console.log(decrypted);

/*
** Asymmetirc cryptography
** public key encrypton and private key encryption
** ssh-keygen
** ssh-keygen -f rsa.pub -e -m pem > rsa_pem.pub
*/

const msg = "foo";
console.log("message: " + msg);
const pubKey = {
	key: fs.readFileSync("./test_pem.pub").toString(),
	passphrase: "crypto"
};
let buffer = Buffer.from(msg, "utf-8");
encrypted = crypto.publicEncrypt(pubKey, buffer);
process.stdout.write("encrypted: ");
console.log(encrypted);
const prvKey = {
	key: fs.readFileSync("./test").toString(),
	passphrase: "crypto"
};
decrypted = crypto.privateDecrypt(prvKey, encrypted);
process.stdout.write("decrypted: ");
console.log(decrypted.toString());
