const SECRET = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const key = 'gTX0hoZZnbfZWQbo6Zf6bA==';
const crypto = require('crypto');
const accept = crypto.createHash('sha1').update(key + SECRET).digest('base64');
console.log(accept);
