let http = require('http');
let cluster = require('cluster');
let server = http.createServer(function (req, res) {
    res.end('worker ' + cluster.worker.id);
}).listen(8080);

http.createServer(function (req, res) {
    res.end('worker ' + cluster.worker.id);
}).listen(server);

http.createServer(function (req, res) {
    res.end('worker ' + cluster.worker.id);
}).listen(server);

http.createServer(function (req, res) {
    res.end('worker ' + cluster.worker.id);
}).listen(server);