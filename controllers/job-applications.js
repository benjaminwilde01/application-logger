const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// IMPORT MODEL
const Application = require('../models/application.js');

// ROUTES
// Index
router.get('/', (req, res) => {
    Application.find({}, (err, allApplications) => {
        if (err) {
            res.send(err)
        } else {
            res.render('index.ejs', {
                applications: allApplications
            });
        };
    });
});

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
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
    // console.log(req.body);
    Application.create(req.body, (err, createdApplication) => {
        res.redirect('/applications');
    });
});

// SHOW
router.get('/:id', (req, res) => {
    
    Application.findById(req.params.id, (err, foundApplication) => {
        res.render('show.ejs', {
            applications: foundApplication
        });
    });
});

// EDIT PAGE
router.get('/:id/edit', (req, res) => {
    Application.findById(req.params.id, (err, foundApplication) => {
        res.render('edit.ejs', {
            applications: foundApplication
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