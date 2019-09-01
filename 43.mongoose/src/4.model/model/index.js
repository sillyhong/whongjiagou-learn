let mongoose = require('mongoose');
let crypto = require('crypto');
let createAt = require('./createAt');
let conn = mongoose.createConnection('mongodb://127.0.0.1/blog');
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: Date
});
UserSchema.plugin(createAt);
/**
 * 如何我们操作的针对于整个集合的，比如说按ID查询，查询年龄最大的学生，定义在模型上
 * 如何调用的方法是针对某个人体对象的，查询某个用户密码位数
 */
UserSchema.statics.findOldest = function (callback) {
    return this.find().sort({ age: -1 }).limit(1).exec(callback);
}
//给模型扩展语义化的方法
UserSchema.statics.findByUserNameAndPassword = function (username, password, callback) {
    //this  指向的是此Schema 对应的Model
    password = crypto.createHmac('SHA256', 'zfpx').update(password).digest('hex');
    return this.findOne({ username, password }, callback);
}
UserSchema.methods.exist = function (callback) {
    return this.password.length;
}
UserSchema.methods.exist = function (callback) {
    //this指向某个实体
    let username = this.username;
    let password = this.password;
    password = crypto.createHmac('SHA256', 'zfpx').update(password).digest('hex');
    return this.model('User').findOne({ username, password }, callback);
}
//编写一个钩子函数，在保存之前执行一些逻辑
// UserSchema.pre('save', function (next) {
//     //this.password = crypto.createHmac('sha256', 'zfpx').update(this.password).digest('hex');
//     console.log('保存前', this);
//     next();
//     console.log('保存后', this);
// });
conn.model('User', UserSchema);
let User = conn.model('User');
exports.User = User;