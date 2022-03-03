const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
  const salesObj = await Sale.findAll({order: [["id", "DESC"]], include: [{ model: User }]});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));
  res.render('find', {sales});
})

router.get('/:id', async (req, res) => {
    id = req.params.id;
    const saleObj = await Sale.findOne({where: { id }}) 
    const sale = saleObj.get({ plain:true })
    console.log(sale)
    res.render('single-find', {sale})
})

router.get('/new', (req, res) => {
    res.render('find-new')
})

router.get('/update/:id', async (req, res) => {
    const findUpdate = await Sale.findOne({where: { id: req.params.id }})
    const find = findUpdate.get({ plain: true })
    res.render('find-update', {find})
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

router.put('/update/:id', async (req, res) => {
    const id = req.params.id
    await Sale.update({
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description,
    },{
        where: {
            id: req.params.id
        }
    })
    res.redirect(`/find/${id}`)
})

router.delete('/:id', async (req, res) => {
    await Sale.destroy({ where: { id:req.params.id }
    });
    res.redirect('/find')
})

module.exports = router;