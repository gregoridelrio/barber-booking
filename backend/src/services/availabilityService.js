const { Barber } = require('../models');

class AvailabilityService {
  async getBarberAvailability(barberId, date) {
    const barber = await Barber.findByPk(barberId);
    if (!barber || !barber.isActive) {
      const error = new Error('Barbero no encontrado o inactivo');
      error.status = 404;
      throw error;
    }

    // Horario laboral base: 09:00 a 17:00
    const startHour = 9;
    const endHour = 17;
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : hour;
      slots.push(`${date}T${formattedHour}:00:00.000Z`);
      slots.push(`${date}T${formattedHour}:30:00.000Z`);
    }

    return {
      barberId: Number(barberId),
      date,
      availableSlots: slots
    };
  }
}

module.exports = new AvailabilityService();