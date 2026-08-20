const sequelize = require('../config/database');
const Service = require('./Service');
const Barber = require('./Barber');

const db = {
  sequelize,
  Service,
  Barber
};

module.exports = db;