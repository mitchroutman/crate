const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/user/login');
    } else {
        next();
    }
};

module.exports = withAuth;