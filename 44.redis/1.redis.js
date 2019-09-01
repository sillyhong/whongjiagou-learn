const redis = require('redis');
const client = redis.createClient(6379, 'localhost');
const Promise = require('bluebird');
Promise.promisifyAll(client);
client.on('error', function (err) {
    console.log(err);
});
/**
client.set('home', 'beijing', function (err, result) {
    console.log(err);
    console.log(result);
})
//p={username:zfpx,age:9}
client.hmset('p1', 'username', 'zfpx', 'age', '9', function (err, result) {
    console.log(err);
    console.log(result);
})
 */
client.hkeys('p1', function (err, keys) {
    console.log(keys);
    keys.forEach(function (key, index, keys) {
        client.hget('p1', key, function (err, value) {
            console.log(key, value);
        });
    });
})