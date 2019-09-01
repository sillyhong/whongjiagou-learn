const https = require('https');
const fs = require('fs');
//私钥
let key = fs.readFileSync('./privatekey.pem', 'utf8');
//CA机构给我颁发的证书
let cert = fs.readFileSync('./certificate.pem', 'utf8');
let options = {
    key,
    cert
}
let server = https.createServer(options, function (req, res) {
    res.end('hello');
});

server.listen(443);