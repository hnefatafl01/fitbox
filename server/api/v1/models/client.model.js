const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: String,
    join_date: { type: Date, default: Date.now },
    active: Boolean,
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Client', clientSchema);
