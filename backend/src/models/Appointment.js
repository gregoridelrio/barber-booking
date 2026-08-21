const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  barberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'barber_id'
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'service_id'
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'customer_name'
  },
  customerEmail: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'customer_email',
    validate: {
      isEmail: true
    }
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'customer_phone'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_time'
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_time'
  },
  status: {
    type: DataTypes.ENUM('CONFIRMED', 'CANCELLED'),
    defaultValue: 'CONFIRMED'
  }
});

module.exports = Appointment;