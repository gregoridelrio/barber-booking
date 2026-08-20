const { sequelize, Service, Barber } = require('../models');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });

    const servicesCount = await Service.count();
    if (servicesCount === 0) {
      await Service.bulkCreate([
        { name: 'Corte de Cabello Clásico', durationMinutes: 30, price: 15.00 },
        { name: 'Arreglo y Perfilado de Barba', durationMinutes: 20, price: 10.00 },
        { name: 'Servicio Completo (Corte + Barba)', durationMinutes: 50, price: 22.00 }
      ]);
      console.log('✅ Servicios iniciales creados.');
    }

    const barbersCount = await Barber.count();
    if (barbersCount === 0) {
      await Barber.bulkCreate([
        { name: 'Carlos Mendoza', email: 'carlos@barberia.com' },
        { name: 'Mateo Silva', email: 'mateo@barberia.com' }
      ]);
      console.log('✅ Barberos iniciales creados.');
    }

    console.log('✅ Base de datos sincronizada y sembrada con éxito.');
  } catch (error) {
    console.error('❌ Error sincronizando la base de datos:', error);
  }
};

module.exports = seedDatabase;