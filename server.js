//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
const bcrypt = require('bcryptjs')

require('dotenv').config();

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
const MONGODBNAME = process.env.MONGODBNAME;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${MONGODBNAME}`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________



// sessions
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// Controllers
const applicationsController = require('./controllers/applications_controller.js');
app.use('/applications', applicationsController);

const userController = require('./controllers/users_controller.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
    res.redirect('/applications');
  });

app.get('/create-session', (req, res) => {
  req.session.potato = 'tomato';
  res.redirect('/');
});

app.get('/retrieve-session', (req, res) => {
  console.log(req.session);
  if (req.session.potato === 'tomato') {
    console.log('that potato is a tomato');
  } else {
    console.log('thank got it is not a potato');
  }
  res.redirect('/');
});

app.get('/update-session', (req, res) => {
  console.log(req.session)
  req.session.potato = 'potato';
  console.log(req.session)
  res.redirect('/')
});

app.get('/delete-session', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.log('something went wrong removing a session');
    } else {
      console.log('session removed successfully');
    }
  });
  res.redirect('/');
});

app.get('/test-bcrypt', (req, res) => {
  const hashedString = bcrypt.hashSync('password', bcrypt.genSaltSync(10));
  console.log(hashedString);
  const samePassword = bcrypt.compareSync('wrongPassword', hashedString);
  console.log(`The password is the same? ${samePassword}`);
  res.redirect('/');
})


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