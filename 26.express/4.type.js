let contentType = require('content-type');
let type = "text/plain;charset=gbk";
let typeObj = contentType.parse(type);
console.log(typeObj);
typeObj.parameters.charset
