module.exports = app => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;
    let RoomSchema = new Schema({
        name: String,
        createAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Room', RoomSchema);
}