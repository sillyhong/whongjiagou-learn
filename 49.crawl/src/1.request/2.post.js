const request = require('request');
let options = {
    url: 'http://localhost:8080/signup',
    method: 'POST',
    //一定要加上此参数
    json: true,
    headers: {
        "Content-Type": "application/json"
    },
    body: { name: 'zfpx', age: 9 }
}
//req.wirte(JSON.stringify({ name: 'zfpx', age: 9 }));
//用户注册功能
request(options, function (err, response, body) {
    if (!err) {
        console.log(body);
    }
});
//req.write   res.write