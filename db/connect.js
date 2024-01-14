const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASS}@cluster0.olutjd9.mongodb.net/AdminAuth?retryWrites=true&w=majority`);
console.log('Database connect')
module.exports = mongoose;