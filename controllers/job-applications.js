const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// IMPORT MODEL
const Application = require('../models/application.js')

// ROUTES
// Index
router.get('/', (req, res) => {
    res.render('index.ejs')
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


module.exports = router;