const mysql = require('mysql')
var Promise = require('bluebird');
const connection = mysql.createConnection({
    host:            '127.0.0.1',   // 数据库地址
    port:            3306,          // 数据库端口
    database:        'juejin',   // 数据库名称
    user:            'root',        // 数据库用户
    password:        '12345',             // 数据库用户对应的密码
    charset:          "utf8mb4_unicode_ci",//解决了表情插入的问题
});
connection.connect();
module.exports={
    query:Promise.promisify(connection.query).bind(connection),
    end:connection.end
}