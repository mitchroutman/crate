const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('seek')
})

router.get('/new', (req, res) => {
    res.render('seek-new')
})

module.exports = router