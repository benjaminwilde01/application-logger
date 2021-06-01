const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;