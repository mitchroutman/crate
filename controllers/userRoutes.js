const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router