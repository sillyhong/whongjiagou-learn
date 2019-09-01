let request = require('request');
request('https://juejin.im/timeline/frontend', function (err, response, body) {
    console.log(err);
    console.log(body);
});