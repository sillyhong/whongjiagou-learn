let BaseController = require('./base');
class RoomsController extends BaseController {
    async createRoom() {
        const { ctx, app } = this;
        let room = ctx.request.body;
        let doc = await ctx.model.Room.findOne({ name: room.name });
        if (doc) {
            this.error('房间已经存在!');
        } else {
            doc = await ctx.model.Room.create(room);
            this.success(doc.toJSON());
        }
    }
    async getAllRooms() {
        const { ctx, app } = this;
        let rooms = await ctx.model.Room.find();
        rooms = rooms.map(room => room.toJSON());
        //给users赋值
        for (let i = 0; i < rooms.length; i++) {
            let room = rooms[i];
            let users = await ctx.model.User.find({ room: room._id, online: true });
            //房间内的用户数组
            room.users = users.map(user => user.toJSON())
        }
        this.success(rooms);
    }
}
module.exports = RoomsController;