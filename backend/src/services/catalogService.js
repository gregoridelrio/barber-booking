const { Service, Barber } = require('../models');

class CatalogService {
  async getActiveServices() {
    return await Service.findAll({
      where: { isActive: true },
      attributes: ['id', 'name', 'durationMinutes', 'price']
    });
  }

  async getActiveBarbers() {
    return await Barber.findAll({
      where: { isActive: true },
      attributes: ['id', 'name', 'email']
    });
  }
}

module.exports = new CatalogService();