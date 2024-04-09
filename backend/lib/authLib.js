const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16); // init vector
const algo = 'hex'; //can be 'base64'
const securityKey = crypto.randomBytes(32);


module.exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);
  let encrypted = cipher.update(text, 'utf8', algo);
  encrypted += cipher.final(algo);
  return encrypted;
};
