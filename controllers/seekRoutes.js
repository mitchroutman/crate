const { Request, User, Sale } = require('../models/');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const seekObj = await Request.findAll({ order:[[ "id", "DESC"]], include: [{ model: User}]});
  const seeks = seekObj.map((seek) => seek.get({ plain:true }));
  res.render('seek', {seeks});
})

router.get('/:id', async (req, res) => {
    id = req.params.id;
    const seekObj = await Request.findOne({where: { id }}) 
    const seeks = seekObj.get({ plain:true })
    console.log(seeks)
    res.render('single-seek', {seeks})
})

router.get('/new', (req, res) => {
    res.render('seek-new')
})

router.get('/update/:id', async (req, res) => {
    const seekUpdate = await Request.findOne({where: { id: req.params.id }})
    const seek = seekUpdate.get({ plain: true })
    res.render('seek-update', {seek})
})

router.post('/new', (req, res) => {
    Request.create({
        user_id: 1,
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description
    })
    .then((newSeek) => {
        res.redirect('/seek')
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

router.put('/update/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    await Request.destroy({ where: { id:req.params.id }
    });
    res.redirect('/seek')
})

module.exports = router