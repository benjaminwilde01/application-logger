//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'job-applications';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// Controller
const applicationsController = require('./controllers/job-applications.js');
app.use('/applications', applicationsController);



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));



// // CONFIGURATION
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const methodOverride = require('method-override');
// const PORT = process.env.PORT || 3000;
// const db = mongoose.connection;


// // Express Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride('_method'));
// app.use(express.static('public'));




// // Exteernal Middleware
// // This makes and names the database whatever is after the /
// mongoose.connect(`mongodb://localhost:27017/job-applications`, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });
// mongoose.connection.once('open', () => {
//     console.log('connected to mongo');
// });

// // Controller
// const applicationsController = require('./controllers/job-applications.js');
// app.use('/applications', applicationsController);






// // Listening
// app.listen(PORT, () => {
//     console.log('Listening on port: ', PORT)
// })