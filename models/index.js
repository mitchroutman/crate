const User = require('./User');
const Sale = require('./Sale');
const Request = require('./Request');

//Export your models so that it can be required in the server.js
// and/or routes files

//Associations
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
})


module.exports = { User, Sale, Request };
