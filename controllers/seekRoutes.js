const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const salesObj = await Request.findAll({});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));

  res.render('seek', {sales});
})

router.get('/new', (req, res) => {
    res.render('seek-new')
})

module.exports = router