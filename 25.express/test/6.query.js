const express = require('../lib/express');
const path = require('path');
const app = express();
const fs = require('fs');

app.get('/', function (req, res) {
    console.log(req.query);
    console.log(req.path);
    res.json({ name: 'zfpx' });
});
app.listen(3000);