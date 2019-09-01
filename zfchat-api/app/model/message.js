module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ObjectId = Schema.Types.ObjectId;
    const MessageSchema = new Schema({
        content: String,
        user: {
            type: ObjectId,
            ref: 'User'
        },
        room: {
            type: ObjectId,
            ref: 'Room'
        },
        createAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Message', MessageSchema);
}