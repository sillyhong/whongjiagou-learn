const mongoose = require('mongoose');
const { dbUrl } = require('./config');
const conn = mongoose.createConnection(dbUrl);
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
exports.User = conn.model('User', UserSchema);
