// CONFIGURATION
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = 3000;


// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));




// Exteernal Middleware
// This makes and names the database whatever is after the /
mongoose.connect(`mongodb://localhost:27017/job-applications`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// Controller
const applicationsController = require('./controllers/job-applications.js');
app.use('/applications', applicationsController);






// Listening
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})