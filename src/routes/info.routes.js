const express = require('express');
const { route } = require('./index.routes');
const router = express.Router();

// especify routes

router.get('/', (req, res) => {
    res.render('info/home');
});


router.get('/about', (req, res) => {
    res.render('info/about');
});

module.exports = router;