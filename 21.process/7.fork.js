let net = require('net');
let { fork } = require('child_process');
let p1 = fork('tcpserver.js', [], {
    cwd: __dirname
});
//WebWorker
let server = net.createServer(function (socket) {
    if (Math.random() % 2 == 0) {
        //开启一个子进程处理 http server tcp socket
        p1.send('socket', socket);
    } else {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
            sum += i;
        }
        socket.write('father ' + sum);
    }
});
server.listen(8080);