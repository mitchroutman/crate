const { Request, User, Sale } = require('../models/');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET

// localhost:3001/seek -- ALL SEEKS 🗣
router.get('/', async (req, res) => {
  const seekObj = await Request.findAll({ order:[[ "id", "DESC"]], include: [{ model: User}]});
  const seeks = seekObj.map((seek) => seek.get({ plain:true }));
  const loggedIn = req.session.loggedIn;
  res.render('seek', {seeks, loggedIn});
})

// localhost:3001/seek/new -- MAKE A NEW 'SEEK' POST: form page.
router.get('/new', withAuth, (req, res) => {
    const loggedIn = req.session.loggedIn;
    res.render('seek-new', {loggedIn})
})

// localhost:3001/seek/:id -- single seek -- more in depth page.
router.get('/:id', async (req, res) => {
    id = req.params.id;
    const seekObj = await Request.findOne({where: { id }, include: [{ model: User}]}) 
    const seek = seekObj.get({ plain:true })
    const loggedIn = req.session.loggedIn;
    // console.log(seeks)
    res.render('single-seek', {seek, loggedIn})
})

// localhost:3001/seek/update/:id
router.get('/update/:id', withAuth, async (req, res) => {
    const seekUpdate = await Request.findOne({where: { id: req.params.id }})
    const seek = seekUpdate.get({ plain: true })
    const loggedIn = req.session.loggedIn;
    res.render('seek-update', {seek, loggedIn})
})


// POST

// localhost:3001/seek/new
router.post('/new', (req, res) => {
    Request.create({
        user_id: req.session.userId,
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description,
        photo: req.body.img
    })
    .then((newSeek) => {
        res.redirect('/seek')
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})


// PUT

// localhost:3001/seek/update/:id
router.put('/update/:id', withAuth, async (req, res) => {
    const id = req.params.id
    await Request.update({
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description,
    },{
        where: {
            id: req.params.id
        }
    })
    res.redirect(`/seek/${id}`)
})


// DELETE

// localhost:3001/seek/:id
router.delete('/:id', withAuth, async (req, res) => {
    await Request.destroy({ where: { id:req.params.id }
    });
    res.redirect('/seek')
})


module.exports = router