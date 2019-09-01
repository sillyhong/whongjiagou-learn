const mysql = require('mysql');
function connect() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'jiagou1'
    });
    connection.connect(err => {
        if (err) {
            console.log('连接失败,', err);
            //为了避免重复连接，所以需要延迟2秒
            setTimeout(connect, 2000);
        }
        ///另外如果能走到，说明连接是成功，但是在查询过程中也有可能出问题
        connection.on('error', function () {
            //如果连接出问题了，则立刻重新连接
            connect();
        });
    });
}
connect();
