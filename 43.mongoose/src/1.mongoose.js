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

//3.通过连接创建模型,模型会关联某个数据库，可以操作数据库
//传入的就是模型的名称,Person=>小写person=>复数people
let Person = conn.model('Person', PersonSchema);

//4.可以通过Model创建实体
//4.1 如果对象中的字段在Schmea中没有定义，则会被忽略 掉
//4.2 如果说对象中的字段少于Schema中定义的字段，则缺少的字段则不会被保存
//4.3 Cast to Number failed for value "zfpx" at path "age" 如果提供 的字段类型和Schema中定义的不匹配，则会报错
//一个实体其实就是一条数据，或者说一个文档
//Person 是模型，它操作的针对提整个集合
//person是实体，Entity ,它是单个的文档或者说对象
/**
let person = new Person({ name: 'zfpx', age: 9 });
person.save((err, doc) => {
    console.log(err);//err = null 表示没有错误 
    console.log(doc);//保存成功之后的文档
});
 */

///查询操作
let persons = [];
for (let i = 1; i <= 10; i++) {
    persons.push({ name: 'zfpx' + i, age: i });
}
//用来插入文档，类似于原生的insert 
/**
Person.create(persons, function (err, docs) {
    console.log(err);
    console.log(docs);
});
 */
//find方法用来在集合中查询文档，返回值永远是一个数组
//Projection cannot have a mix of inclusion and exclusion
/**
Person.find({ age: 3 }, { name: 1, age: 1 }, function (err, docs) {
    console.log(err);
    console.log(docs);
});
 */
//这里的更新和原生不太一样，即使传入了整个文档，也不会直接覆盖原文档，也是按字段覆盖
//{ n: 1, nModified: 1, ok: 1 } n表示匹配的条数，nModified实际更新的条数 ok=1表示操作成功
//{ n: 2, nModified: 2, ok: 1 }
/**
Person.update({ age: 100 }, { $set: { age: 100 } }, { multi: true }, function (err, result) {
    console.log(result);
});
 */
//remove默认会删除所有匹配的文档,如果只想删除匹配的第一条的话
/**
Person.remove({ age: 100 }, { justOne: true }, function (err, result) {
    console.log(err);
    console.log(result);
});
**/
//登录 用户名和密码
/**
Person.findOne({}, function (err, doc) {
    console.log(doc);
});
**/
//按ID查询文档
/**
Person.findById({ _id: '5ae52f09970d401c245df399' }, function (err, doc) {
    console.log(doc);
});
**/
//查询年龄<5
//{ age: { $lt: 5 } 查询条件里 查询年龄小于5
//{$set:{age:100}}  更新的时候 设置年龄等于100
//且
/**
Person.find({ age: { $gte: 1, $lte: 5 } }, function (err, docs) {
    console.log(docs);
});

//或 年龄小于3或者大于5
Person.find({ $or: [{ age: { $lt: 3 } }, { age: { $gt: 5 } }] }, function (err, docs) {
    console.log(err);
    console.log(docs);
});

//不等于
Person.find({ age: { $ne: 3 } }, function (err, docs) {
    console.log(err);
    console.log(docs);
});

// $in $nin
Person.find({ age: { $nin: [1, 3, 5] } }, function (err, docs) {
    console.log(err);
    console.log(docs);
});
**/
Person.find({ home: { $exists: true } }, function (err, docs) {
    console.log(err);
    console.log(docs);
});