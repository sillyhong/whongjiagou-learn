// cnpm i mongoose -S
//mongoose是一个对象模型工具，就是把对数据的操作映射为对对象的操作
let mongoose = require('mongoose');
//1.连接数据库
let conn = mongoose.createConnection('mongodb://127.0.0.1/zfpx');
//如果说打开数据库失败，那么会触发error事件
conn.on('error', function (err) {
    console.error('err:', err);
});
//如果数据库连接成功，成功的打开了数据库，那么会触发open事件
conn.on('open', function () {
    //console.error('open');
});

//2.创建Schmea 创建数据库的骨架模型,用定来定义集合的名称 字段的名称 字段的类型
let PersonSchema = new mongoose.Schema({
    name: String,
    age: Number
});//可以通过这种方式定义集合的名称
let Person = conn.model('Person', PersonSchema);

let pageNum = 2;
let pageSize = 3;
Person.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ age: -1 })
    .exec(function (err, docs) {
        console.log(err);
        console.log(docs);
    });
// Not SQL //  Not Only SQL