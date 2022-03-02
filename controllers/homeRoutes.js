const { Sale } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const sales = await Sale.findAll({})
  res.render('homepage');
});

module.exports = router;
