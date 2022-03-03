const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('find')
})

router.get('/new', (req, res) => {
    res.render('find-new')
})

module.exports = router