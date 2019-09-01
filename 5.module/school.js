

//此变量属于私有变量
this.a = 'hello';
exports.a = 'hello';
console.log(this === module.exports);
console.log('school初始化');
console.log(exports, require, module, __filename, __dirname);

let name = 'zfpx';
let age = 9;
module.exports = {name,age};
console.log(module);