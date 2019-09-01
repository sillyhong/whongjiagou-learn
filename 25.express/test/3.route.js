const express = require('express');
const app = express();
app.route('/user').get(function (req, res) {
    res.end('get');
}).post(function (req, res) {
    res.end('postget');
}).put(function (req, res) {
    res.end('put');
}).delete(function (req, res) {
    res.end('delete');
})
app.listen(3000);