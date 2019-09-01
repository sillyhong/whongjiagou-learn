let http = require('http');
process.on('beforeExit', function () {
    console.log('beforeExit');
    http.createServer((req, res) => {
        res, end('hello world');
    }).listen(8080);
});
setTimeout(function () {

}, 2000);

