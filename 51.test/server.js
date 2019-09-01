const express = require('express');
const path = require('path');
const app = express();
app.get('/ajax.js', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'src/ajax.js'));
});
app.get('/getUsers.js', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'src/getUsers.js'));
});
app.get('/users', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'users.html'));
});
app.get('/users.json', function (req, res) {
    res.json({
        code: 0,
        users: [
            { name: 'zfpx1' },
            { name: 'zfpx2' },
            { name: 'zfpx3' }
        ]
    });
});
app.listen(3000);