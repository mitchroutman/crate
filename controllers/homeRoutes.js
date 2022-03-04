const { Sale, Request } = require('../models');
const router = require('express').Router();

// GET

// localhost:3001
router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const salesObj = await Sale.findAll({});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));

  const reqObj = await Request.findAll({});
  const requests = reqObj.map((request) => request.get({ plain:true }));

  res.render('homepage', {sales, requests});
});

router.get('/404', (req, res) => {
  res.render('404');
})

module.exports = router;
