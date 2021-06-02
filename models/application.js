
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const applicationSchema = new Schema({
    name: { type: String, require: true },
    date: { type: Date, require: true },
    position: { type: String, require: true },
    jobPosting: String,
    service: String,
    location: String,
    comment: String,
    interview: Boolean,
    offer: Boolean,
    author: String
}, { timestamps: true });




const Application = mongoose.model('Applications', applicationSchema);



module.exports = Application;
