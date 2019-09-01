module.exports = app => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;
    let ObjectId = Schema.Types.ObjectId;
    let UserSchema = new Schema({
        name: String,
        email: String,
        avatar: String,
        //当前用户是否在线，连接上websocket服务器online=true,断开online=false
        online: { type: Boolean, default: false },
        room: {//当前的用户所在的房间
            type: ObjectId,
            ref: 'Room'
        },
        createAt: { type: Date, default: Date.now }
    });
    return mongoose.model('User', UserSchema);
}