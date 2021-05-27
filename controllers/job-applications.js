const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//ROUTES
//Index
router.get('/', (req, res) => {
    res.render('index.ejs')
})

module.exports = router;