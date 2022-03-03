const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const salesObj = await Request.findAll({ order:[[ "id", "DESC"]], include: [{ model: User}]});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));
  res.render('seek', {sales});
})

router.get('/new', (req, res) => {
    res.render('seek-new')
})

router.post('/new', (req, res) => {
    Request.create({
        user_id: 1,
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description
    })
    .then((newSale) => {
        res.redirect('/seek')
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router