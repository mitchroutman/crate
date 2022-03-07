const User = require('./User');
const Sale = require('./Sale');
const Request = require('./Request');
const Comment = require('./Comment');

// Associations

User.hasMany(Sale, {
    foreignKey: "user_id"
});

Sale.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Request, {
    foreignKey: "user_id"
});

Request.belongsTo(User, {
    foreignKey: "user_id"
});


// Associations for COMMENTS

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Sale, {
    foreignKey: 'sale_id'
});

Sale.hasMany(Comment, {
    foreignKey: 'sale_id'
});

Comment.belongsTo(Request, {
    foreignKey: 'request_id'
});

Request.hasMany(Comment, {
    foreignKey: 'request_id'
});


module.exports = { User, Sale, Request, Comment };