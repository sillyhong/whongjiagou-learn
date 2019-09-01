//send方法其实可以有两个参数 ，第一个参数是任意类型 第二个参数只能是http server net server socket
let c = require('child_process');
let http = require('http');
let os = require('os');
let server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.end('请求在父进程被处理');
});

server.listen(8080);


for (let i = 0; i < os.cpus.length; i++) {
    let p1 = c.fork('server.js', [], {
        cwd: __dirname
    });
    p1.send('server', server);
}


