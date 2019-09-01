let redis = require('redis');
let client = redis.createClient(6379, 'localhost');
client.multi().set('k3', 'v3').set('k4', 'v4').get('k4').exec(function (err, result) {
    console.log(err);
    console.log(result);
});