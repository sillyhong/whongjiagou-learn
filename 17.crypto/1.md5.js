/**
 * 1.可以用来检验要下载的文件是否被改动过
 * 2. 对密码进行加密 123456 => md5值
 *  
**/
let crypto = require('crypto');
let str = 'hello';
//console.log(crypto.getHashes());
//let md5 = crypto.createHash('sha1');
//md5.update('ssssssssss');//指定要加密的值
//md5.update('world');//再次添加要加密的值
console.log(md5.digest('hex'));//输出md5值，指定输出的格式 hex 十六进制
//fc5e038d38a57032085441e7fe7010b0 32位 
//6adfb183a4a2c94a2f92dab5ade762a47889a5a1 40位

/**
 * 其实有这一个应用场景 ，当客户端访问服务器的时候，服务器有可能会返回一个响应头 Content-Md5
 * 这个值就是响应体的md5值。
 */