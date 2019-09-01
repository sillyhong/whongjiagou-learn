let mongoose = require('mongoose');
let crypto = require('crypto');
let conn = mongoose.createConnection('mongodb://127.0.0.1/blog');
let PersonSchema = new mongoose.Schema({
    first_name: String, //姓  张
    last_name: String,   //名 三
    //full_name: String,    //张三
    phone: String         //电话 010-6255889
});
//如果说有人想获取实例上的full_name属性的话，则把 get里面传入的函数的返回值赋给他
PersonSchema.virtual('full_name').get(function () {
    return this.first_name + this.last_name;
});
PersonSchema.virtual('area').get(function () {
    return this.phone.split('-')[0];
});
PersonSchema.virtual('phonenumber').get(function () {
    return this.phone.split('-')[1];
});
let Person = conn.model('Person', PersonSchema);
let p = new Person({ phone: '010-6255889', first_name: '张', last_name: '三' });
//获取全名
console.log(p.full_name);
console.log(p.area);
console.log(p.phonenumber);
p.save(() => { });