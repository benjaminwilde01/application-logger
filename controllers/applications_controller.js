const { application } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// IMPORT MODEL
const Application = require('../models/application.js');

// Custom Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


  
// ROUTES
// Index
router.get('/', isAuthenticated, (req, res) => {
        Application.find({}, function(err, app) {
            let filteredArray = []
            for (let i = 0; i < app.length; i++) {
               
                if (app[i].author === req.session.currentUser._id) {
                    filteredArray.push(app[i])
               }
            }

            res.render('index.ejs', {
                currentUser: filteredArray,
            })
        })
    })
    
    

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    })
});

// CREATE
router.post('/', (req, res) => {
    if (req.body.interview === 'on') {
        req.body.interview = true;
    } else {
        req.body.interview = false;
    };
    if (req.body.offer === 'on') {
        req.body.offer = true;
    } else {
        req.body.offer = false;
    };

    let createApplication = {
        name: req.body.name,
        date: req.body.date,
        position: req.body.position,
        jobPosting: req.body.jobPosting,
        service: req.body.service,
        location: req.body.location,
        comment: req.body.comment,
        interview: req.body.interview,
        offer: req.body.offer,
        author: req.session.currentUser._id
    }
    Application.create(createApplication, (err, createApplication) => {
        res.redirect('/applications');
        
    })
});

// SHOW
router.get('/:id', (req, res) => {
    Application.findById(req.params.id, (err, foundApplication) => {
        
        res.render('show.ejs', {
            applications: foundApplication,
            currentUser: req.session.currentUser
        });
    });
});

// EDIT PAGE
router.get('/:id/edit', (req, res) => {
    Application.findById(req.params.id, (err, foundApplication) => {
        res.render('edit.ejs', {
            applications: foundApplication,
            currentUser: req.session.currentUser
        });
    });
});

// EDIT PUT ROUTE
router.put('/:id', (req, res) => {
    if (req.body.interview === 'on') {
        req.body.interview = true;
    } else {
        req.body.interview = false;
    };
    if (req.body.offer === 'on') {
        req.body.offer = true;
    } else {
        req.body.offer = false;
    };
    console.log(req.body)

    Application.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        res.redirect('/applications')

    });
});

// DELETE
router.delete('/:id', (req, res) => {
    Application.findByIdAndRemove(req.params.id, (err, deletedApplication) => {
        res.redirect('/applications');
    });
});



module.exports = router;