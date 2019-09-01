//只想知道模块的路径，但又不想加载这个模块
console.log(require.resolve('./school'));
//main主要的，其实指就是入口模块
//console.log(require.main);
/**
 * 在node里模块的类型有三种
 * 1. JS模块
 * 2. json模块
 * 先找文件，读取文件内容，JSON.parse转成对象返回
 * 3. node C++扩展二进制模块
 * 这属于二进制模块
 * 当require加载一个模块的时候，会先找user.如果找不到，会再找user.js,如果还找不到找user.json,如果还找不到user.node
 */
let user = require('./user.json');
console.log(user);
console.log(require.extensions);