const bookingService = require('../services/bookingService');

exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await bookingService.createAppointment(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const { date, barberId } = req.query;
    const targetBarberId = req.user.role === 'BARBER' ? req.user.barberId : (barberId || null);

    const appointments = await bookingService.getAppointmentsByDate(date, targetBarberId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};