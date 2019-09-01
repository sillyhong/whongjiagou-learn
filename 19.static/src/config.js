
let debug = require('debug')('static:config');
let path = require('path');
let config = {
    host: 'localhost',//监听的主机
    port: 8080,//监听的端口号
    root: path.resolve(__dirname, '..', 'public')//配置静态文件根目录
}
debug(config);
module.exports = config;