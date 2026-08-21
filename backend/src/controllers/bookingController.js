const bookingService = require('../services/bookingService');

exports.createAppointment = async (req, res, next) => {
  try {
    const { barberId, serviceId, customerName, customerEmail, customerPhone, startTime } = req.body;

    if (!barberId || !serviceId || !customerName || !customerEmail || !customerPhone || !startTime) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios para completar la reserva'
      });
    }

    const appointment = await bookingService.createAppointment({
      barberId,
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      startTime
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
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

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro date es requerido en formato YYYY-MM-DD'
      });
    }

    const targetBarberId = req.user.role === 'BARBER' ? req.user.barberId : (barberId || null);

    const appointments = await bookingService.getAppointmentsByDate(date, targetBarberId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};