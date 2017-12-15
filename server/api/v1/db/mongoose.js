const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGODB_URI, { useMongoClient: true })
    .then((db) => console.log('connected to db'),
    (err) => console.error(err));

module.exports = { mongoose };