const { Sale, Request, User } = require('../models');
const router = require('express').Router();

// GET

// localhost:3001
router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const salesObj = await Sale.findAll({ order: [["id", "DESC"]], include: [{ model: User }]});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));

  const seekObj = await Request.findAll({ order: [["id", "DESC"]], include: [{ model: User }]});
  const seeks = seekObj.map((seek) => seek.get({ plain:true }));

  const loggedIn = req.session.loggedIn
  const username = req.session.username

  res.render('homepage', { sales, seeks, loggedIn, username });
});

router.get('/404', (req, res) => {
  res.render('404');
})

module.exports = router;
