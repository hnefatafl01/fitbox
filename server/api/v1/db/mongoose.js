const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log(process.env.MONGODB_URI)

mongoose
    .connect(process.env.MONGODB_URI)
    .then((db) => console.log('connected to db'),
    (err) => console.error(err));

module.exports = { mongoose };