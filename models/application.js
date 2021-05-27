const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    position: String,
    service: String,
    location: String,
    note: String,
    interview: Boolean,
    offer: Boolean
}, { timestamps: true });

const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;