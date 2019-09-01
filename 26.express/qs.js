let querystring = require('querystring');
let qs = require('qs');
let obj = { name: 'zfpx', home: { name: 'beijing' } };
let r = qs.stringify(obj);
console.log(r);
