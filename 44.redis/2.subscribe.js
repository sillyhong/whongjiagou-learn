const redis = require('redis');
let client1 = redis.createClient(6379, 'localhost');
let client2 = redis.createClient(6379, 'localhost');
client1.subscribe('food');
client1.subscribe('drink');
//指定当收到订阅的消息之后要干什么
client1.on('message', function (channel, message) {
    console.log(channel, message);
    client1.unsubscribe('food');//以后再也不接收食品频道的消息
});
setTimeout(function () {
    client2.publish('food', '面包');
    client2.publish('drink', '可乐');
    setTimeout(function () {
        client2.publish('food', '面包2');
        client2.publish('drink', '可乐2');
    }, 1000);
}, 1000);
