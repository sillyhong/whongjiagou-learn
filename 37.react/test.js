let pathToRegexp = require('path-to-regexp');
let str = '/user/detail/:id/:name';
let keys = [];
let reg = pathToRegexp(str,keys,{end:true});
keys = keys.map(key=>key.name);
let uri = '/user/detail/1/zfpx';
let result = uri.match(reg);
let  [url,...values] = result;
let params =  keys.reduce((memo,key,idx)=>{
    memo[key] = values[idx];
    return memo;
},{});
console.log(keys);
console.log(uri == url);
console.log(params);