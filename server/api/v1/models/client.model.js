const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: String,
    join_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);
