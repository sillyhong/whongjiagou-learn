const express = require('./express');
const app = express();
// /user?name=zfpx&age=8
//内靠的是一个内置中间件
app.get('/user', function (req, res) {
    console.log(req.query); // {name:'zfpx',age:8}
    console.log(req.path); // /user
    console.log(req.hostname);//主机机
    res.end('ok');
});
app.listen(8080);