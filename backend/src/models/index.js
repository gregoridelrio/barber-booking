const sequelize = require('../config/database');
const Service = require('./Service');
const Barber = require('./Barber');
const Appointment = require('./Appointment');
const User = require('./User');

// Relaciones
Barber.hasMany(Appointment, { foreignKey: 'barberId' });
Appointment.belongsTo(Barber, { foreignKey: 'barberId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

Barber.hasOne(User, { foreignKey: 'barberId' });
User.belongsTo(Barber, { foreignKey: 'barberId' });

const db = {
  sequelize,
  Service,
  Barber,
  Appointment,
  User
};

module.exports = db;