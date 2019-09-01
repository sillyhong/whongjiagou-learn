let https = require('https');
const fs = require('fs');
let options = {
    host: 'localhost',
    port: 443,
    path: '/',
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem'),
    rejectUnhauthorized: false,
}
https.request(options, function (err, response, body) {
    console.log(body);
});