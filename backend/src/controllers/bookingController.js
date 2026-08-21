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