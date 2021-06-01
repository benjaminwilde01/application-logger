
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const applicationSchema = new Schema({
    name: String,
    date: Date,
    position: String,
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
