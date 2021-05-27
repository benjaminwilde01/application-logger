const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    service: { type: String, required: true },
    location: type: String,
    note: type: String,
    interview: Boolean,
    offer: Boolean
}, { timestamps: true });

const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;