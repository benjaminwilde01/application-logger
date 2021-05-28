const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: String,
    date: Date,
    position: String,
    jobPosting: String,
    service: String,
    location: String,
    comment: String,
    interview: Boolean,
    offer: Boolean
}, { timestamps: true });

const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;