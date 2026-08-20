const availabilityService = require('../services/availabilityService');

exports.getAvailability = async (req, res, next) => {
  try {
    const { barberId } = req.params;
    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro date es requerido y debe tener formato YYYY-MM-DD'
      });
    }

    const availability = await availabilityService.getBarberAvailability(barberId, date);
    res.status(200).json({ success: true, data: availability });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ success: false, message: error.message });
    }
    next(error);
  }
};