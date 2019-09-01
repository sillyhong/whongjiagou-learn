let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));
// 密码 123   加盐算法
let hmac = crypto.createHmac('sha1', key);
hmac.update('123');
let result = hmac.digest('hex');
console.log(result);
//be9106a650ede01f4a31fde2381d06f5fb73e612

