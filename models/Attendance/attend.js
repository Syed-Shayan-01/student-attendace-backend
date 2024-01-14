const mongoose = require('mongoose');

const attendSchema = mongoose.Schema({
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // course: { type: String, required: true },
    // phoneNumber: { type: Number, required: true },
    image: { type: String }
})

const Attendance = mongoose.model('Attendance', attendSchema)

module.exports = { Attendance };