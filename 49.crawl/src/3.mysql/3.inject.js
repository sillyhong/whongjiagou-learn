const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jiagou1'
});

connection.connect();
let username = "admin";
let password = "' OR 1=1 OR 2='";
//let password = "' OR 1=1 ;drop table users;";
//console.log(`SELECT * FROM users WHERE username = '${connection.escape(username)}' AND password='${password}'`);
// connection.query(`SELECT * FROM users WHERE username = '${connection.escape(username)}' AND password='${password}'`, function (err, result) {
//     console.log(err);
//     console.log(result);
// });
//1 如果你还是拼SQL语句的话就请用 connection.escape转义
// 或者使用点位符
connection.query(`SELECT * FROM users WHERE username = ? AND password=?`, [username, password], function (err, result) {
    console.log(err);
    console.log(result);
});