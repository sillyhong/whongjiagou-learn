let http = require('http');
let server = http.createServer(function (req, res) {
    res.end('9000');
}).listen(9000);
// http://localhost:9000 qinmengjiao.com