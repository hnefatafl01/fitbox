const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Client', clientSchema);
