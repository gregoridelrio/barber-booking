const sequelize = require('../config/database');
const Service = require('./Service');
const Barber = require('./Barber');
const Appointment = require('./Appointment');

// Relaciones
Barber.hasMany(Appointment, { foreignKey: 'barberId' });
Appointment.belongsTo(Barber, { foreignKey: 'barberId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

const db = {
  sequelize,
  Service,
  Barber,
  Appointment
};

module.exports = db;