const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

// GET

// localhost:3001/user/login
router.get('/login', (req, res) => {
    res.render('login')
})

// localhost:3001/user/register
router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router