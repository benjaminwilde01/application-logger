const bcrypt = require('bcryptjs');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});

// on sessions form submit (log in)
sessions.post('/', (req, res) => {  
    // Step 1 Look for the username
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        // DB error
        if (err) {
            console.log(err);
            res.send('oops the database had a problem');
        } else if (!foundUser) {
            // if found user is undefined/not found/etc..
            res.send('<a href="/">Sorry, no user found </a>');
        } else {
            // user is found
            // now check for password match
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                //add user to our session
                req.session.currentUser = foundUser;
                // redirect to home page
                res.redirect('/');
            } else {
                // passwords do not match
                res.send('<a href="/"> password does not match </a>');
            };
        };
    });
});

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = sessions;