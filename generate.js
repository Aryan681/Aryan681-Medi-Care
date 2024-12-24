

const crypto = require('crypto');
const ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex').slice(0, 32);
console.log(ENCRYPTION_KEY); // Save and use this key


