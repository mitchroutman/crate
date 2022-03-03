const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const findRoutes = require('./findRoutes');
const seekRoutes = require('./seekRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/find', findRoutes);
router.use('/seek', seekRoutes);
router.use('/user', userRoutes);


module.exports = router;
