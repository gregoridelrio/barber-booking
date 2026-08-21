const { Op } = require('sequelize');
const { Appointment, Service, Barber, sequelize } = require('../models');

class BookingService {
  async createAppointment({ barberId, serviceId, customerName, customerEmail, customerPhone, startTime }) {
    const barber = await Barber.findByPk(barberId);
    if (!barber || !barber.isActive) {
      const error = new Error('Barbero no encontrado o inactivo');
      error.status = 404;
      throw error;
    }

    const service = await Service.findByPk(serviceId);
    if (!service || !service.isActive) {
      const error = new Error('Servicio no encontrado o inactivo');
      error.status = 404;
      throw error;
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      const error = new Error('Fecha/hora de inicio inválida');
      error.status = 400;
      throw error;
    }

    const end = new Date(start.getTime() + service.durationMinutes * 60000);

    const existingAppointment = await Appointment.findOne({
      where: {
        barberId,
        status: 'CONFIRMED',
        startTime: { [Op.lt]: end },
        endTime: { [Op.gt]: start }
      }
    });

    if (existingAppointment) {
      const error = new Error('El barbero ya tiene una cita reservada en ese horario');
      error.status = 409; // Conflict
      throw error;
    }

    const appointment = await Appointment.create({
      barberId,
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      startTime: start,
      endTime: end
    });

    return appointment;
  }
}

module.exports = new BookingService();