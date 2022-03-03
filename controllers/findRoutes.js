const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
  const salesObj = await Sale.findAll({order: [["id", "DESC"]], include: [{ model: User }]});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));
  res.render('find', {sales});
})

router.get('/new', (req, res) => {
    res.render('find-new')
})

router.post('/new', (req, res) => {
    Sale.create({
        user_id: 1,
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description
    })
    .then((newSale) => {
        res.redirect('/find')
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router;