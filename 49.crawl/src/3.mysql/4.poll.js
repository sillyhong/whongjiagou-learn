const mysql = require('mysql');
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jiagou1',
    connectionLimit: 5
});
pool.getConnection(function (err, connection) {
    connection.query(`SELECT * FROM users`, (err, result) => {
        console.log(result);
    });
});