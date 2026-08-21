const { Barber, Appointment } = require('../models');
const { Op } = require('sequelize');

class AvailabilityService {
  async getBarberAvailability(barberId, date) {
    const barber = await Barber.findByPk(barberId);
    if (!barber || !barber.isActive) {
      const error = new Error('Barbero no encontrado o inactivo');
      error.status = 404;
      throw error;
    }

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const existingAppointments = await Appointment.findAll({
      where: {
        barberId,
        status: 'CONFIRMED',
        startTime: { [Op.between]: [startOfDay, endOfDay] }
      }
    });

    const startHour = 9;
    const endHour = 17;
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : hour;
      
      const slotTime1 = new Date(`${date}T${formattedHour}:00:00.000Z`);
      const slotTime2 = new Date(`${date}T${formattedHour}:30:00.000Z`);

      [slotTime1, slotTime2].forEach(slot => {
        const isOccupied = existingAppointments.some(app => {
          return slot >= app.startTime && slot < app.endTime;
        });

        if (!isOccupied) {
          slots.push(slot.toISOString());
        }
      });
    }

    return {
      barberId: Number(barberId),
      date,
      availableSlots: slots
    };
  }
}

module.exports = new AvailabilityService();