const mysql = require('mysql')
const Promise = require('bluebird')

const connection = mysql.createConnection({
    host:            '127.0.0.1',   // 数据库地址
    port:            3306,          // 数据库端口
    database:        'zhufengjiagou',   // 数据库名称
    user:            'root',        // 数据库用户
    password:        ''             // 数据库用户对应的密码
});
connection.connect()
module.exports = {
    query: Promise.promisify(connection.query).bind(connection),
    end: connection.end
}