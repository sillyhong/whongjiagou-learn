let fs = require('fs');
let path = require('path');
let txt = fs.readFileSync(path.resolve(__dirname, '1.txt'), 'utf8');
console.log(txt);
//<Buffer 31 32 33 0d 0a 34 35 36 0d 0a 37 38 39>
console.log(txt.replace(/\r\n/g, ','));
