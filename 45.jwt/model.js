const mongoose = require('mongoose');
const { dbUrl } = require('./config');
// const conn = mongoose.createConnection(dbUrl);
const conn = mongoose.createConnection(dbUrl, {useNewUrlParser: true});
conn.then((res, err)=>{
    if(!err){
        console.log('连接数据库成功', err)
    }else{
        console.log('连接数据库失败')
    }
})
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
exports.User = conn.model('User', UserSchema);
