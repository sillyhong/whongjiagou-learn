const express = require('express');
const path = require('path');
const app = express();
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'long.html'));
});
app.get('/clock', function (req, res) {
    setTimeout(function () {
        res.end(new Date().toLocaleString());
    }, 10 * 1000);
});
app.listen(8080);