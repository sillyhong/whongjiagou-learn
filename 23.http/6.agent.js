let http = require('http');
let parse = require('user-agent-parser')
let server = http.createServer(function (req, res) {
    let userAgent = req.headers['user-agent'];
    console.log(userAgent);
    let userAgentObj = parse(userAgent);
    res.end(JSON.stringify(userAgentObj));
});
server.listen(8080);