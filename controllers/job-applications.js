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



module.exports = router;