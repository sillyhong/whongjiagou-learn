let fs = require('fs');
let path = require('path');
let ws = fs.createWriteStream(path.join(__dirname, 'msg.txt'));
process.stdin.on('data', function (data) {
    ws.write(data);
});