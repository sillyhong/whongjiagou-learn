let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, 'index.js'));
rs.on('data', function (data) {
    cosole.log(data);
})