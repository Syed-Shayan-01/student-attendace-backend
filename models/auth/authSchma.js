const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, },
    Admin: Boolean,
})

const Auth = mongoose.model('Auth', authSchema);
module.exports = { Auth };