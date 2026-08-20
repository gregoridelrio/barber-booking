const catalogService = require('../services/catalogService');

exports.getServices = async (req, res, next) => {
  try {
    const services = await catalogService.getActiveServices();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

exports.getBarbers = async (req, res, next) => {
  try {
    const barbers = await catalogService.getActiveBarbers();
    res.status(200).json({ success: true, data: barbers });
  } catch (error) {
    next(error);
  }
};