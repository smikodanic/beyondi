const crypto = require('crypto');

module.exports.encrypt = (text) => {
  // const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const salt = process.env.SALT;
  let hash = crypto.pbkdf2Sync(text, salt, 1000, 64, 'sha256').toString('hex'); // Hash the password with the salt using SHA-256
  hash = hash.substring(0, 16);
  return hash;
};
