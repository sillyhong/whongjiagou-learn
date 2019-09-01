const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jiagou1'
});
connection.connect();
//query是执行SQL语句的意思，并非仅仅用来查询
// connection.query(`SELECT 1+1 和,2-1 差 `, function (error, result) {
//     console.log(error);
//     console.log(result);
//     //console.log(fields);
// });
///插入
/**
connection.query(`INSERT INTO student(id,name) VALUES(3,'zfpx3')`, function (error, result) {
    console.log(error);
    console.log(result);
    //console.log(fields);
});
 */
//更新
/**
connection.query(`UPDATE student SET name = 'zfpx22' WHERE id=2 `, function (error, result) {
    console.log(error);
    console.log(result);
});
 */

connection.query(`DELETE FROM student WHERE id=2 `, function (error, result) {
    console.log(error);
    console.log(result);
});
