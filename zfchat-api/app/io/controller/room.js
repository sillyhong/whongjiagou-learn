const { Controller } = require('egg');
class RoomController extends Controller {
    async addMessage() {
        let { ctx, app } = this;
        //{user,room,content}
        let message = ctx.args[0];
        let doc = await ctx.model.Message.create(message);
        doc = await ctx.model.Message.findById(doc._id).populate('user');
        //此入应该是向某个房间内广播 
        app.io.emit('messageAdded', doc.toJSON());
    }
    async getAllMessages() {
        let { ctx, app } = this;
        let room = ctx.args[0];
        let messages = await ctx.model.Message.find({ room }).populate('user').sort({ createAt: -1 }).limit(20);
        ctx.socket.emit('allMessages', messages.reverse());
    }
}
module.exports = RoomController;

/**
 * // ctx.args 是消息的参数,就是一个数组，是客户端emit除了事件类型之外的其它参数
 * // 在服务器把收到的消息广播给所有的其它的客户端
 * // app.io.emit('messageAdded', message);
 */