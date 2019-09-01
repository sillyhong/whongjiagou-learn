let http = require('http');
let cluster = require('cluster');
http.createServer(function (req, res) {
    res.end('worker ' + cluster.worker.id);
}).listen(8080);