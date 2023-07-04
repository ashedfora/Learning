const crypto = require('crypto');

const hash = (key) => crypto.createHash('sha256').update(key).digest('base64');

module.exports = hash;
