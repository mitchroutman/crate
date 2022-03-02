const sequelize = require('../config/connection');
const { User, Request, Sale } = require('../models');

const userData = require('./users.json');
const saleData = require('./sales.json');
const requestData = require('./request.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Request.bulkCreate(requestData);

  await Sale.bulkCreate(saleData);

  process.exit(0);
};

seedDatabase();
