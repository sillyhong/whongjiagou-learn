//对称加密 加密和上面的摘要
let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let str = 'sdfasadf#fdfd!22';
let pk = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));
let cipher = crypto.createCipher('blowfish', pk);
let result = cipher.update(str, 'utf8', 'hex');
result += cipher.final('hex');//输出加密后的结果
console.log(result);
//771a5b490b3a42ce

let decipher = crypto.createDecipher('blowfish', pk);
let r = decipher.update(result, 'hex', 'utf8');
r += decipher.final('utf8');
console.log(r);
