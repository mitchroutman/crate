const { Request, User, Sale, Comment } = require('../models/');
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
    // GET COMMENTS
    const commentObj = await Comment.findAll({where: {request_id: id}, include: [{ model: User}], order: [["id", "DESC"]]});
    const comments = commentObj.map((comment) => comment.get({ plain: true }))
    console.log(comments.length)
    let showComment = false
    if (comments.length > 0) {
        showComment = true
    }

    let showImage = true
    if (seek.photo.length === 0) {
        showImage = false
    }

    res.render('single-seek', {seek, loggedIn, comments, showComment, showImage})
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

//POST route for comments

router.post('/comment/:id', withAuth, async (req, res) => {
    console.log(req.body.comment)
    await Comment.create({
        comment: req.body.comment,
        user_id: req.session.userId,
        request_id: req.params.id,
    });
    res.redirect(`/seek/${req.params.id}`)
})

// PUT

// localhost:3001/seek/update/:id
router.put('/update/:id', withAuth, async (req, res) => {
    const id = req.params.id
    await Request.update({
        album_name: req.body.album,
        artist: req.body.artist,
        description: req.body.description,
        photo: req.body.img
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