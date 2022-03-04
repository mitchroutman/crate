const { Request, User, Sale } = require('../models/');
const withAuth = require('../utils/auth');
const router = require('express').Router();

// GET

// localhost:3001/find -- ALL FINDS
router.get('/', async (req, res) => {
      // Send the rendered Handlebars.js template back as the response
  const salesObj = await Sale.findAll({order: [["id", "DESC"]], include: [{ model: User }]});
  const sales = salesObj.map((sale) => sale.get({ plain:true }));
  res.render('find', {sales});
})

// localhost:3001/find/new -- MAKE A 'SALE' POST: this is the form page.
router.get('/new', withAuth, (req, res) => {
    res.render('find-new')
});

// localhost:3001/find/:id -- single find -- more in depth page.
router.get('/:id', async (req, res) => {
    id = req.params.id;
    const saleObj = await Sale.findOne({where: { id }, include: [{ model: User }]}) 
    const sale = saleObj.get({ plain:true })
    // console.log(sale)
    res.render('single-find', {sale})
});

// localhost:3001/find/update/:id
router.get('/update/:id', withAuth, async (req, res) => {
    const findUpdate = await Sale.findOne({where: { id: req.params.id }})
    const find = findUpdate.get({ plain: true })
    res.render('find-update', {find})
});


// POST 

// localhost:3001/find/new
router.post('/new', (req, res) => {
    Sale.create({
        user_id: req.session.userId,
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
});


// PUT

// localhost:3001/find/update/:id
router.put('/update/:id', withAuth, async (req, res) => {
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


// DELETE

// localhost:3001/find/:id
router.delete('/:id', withAuth, async (req, res) => {
    await Sale.destroy({ where: { id:req.params.id }
    });
    res.redirect('/find')
});


module.exports = router;