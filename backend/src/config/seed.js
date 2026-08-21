const { sequelize, Service, Barber, User } = require('../models');

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

    let barber1 = await Barber.findOne({ where: { email: 'carlos@barberia.com' } });
    if (!barber1) {
      barber1 = await Barber.create({ name: 'Carlos Mendoza', email: 'carlos@barberia.com' });
      await Barber.create({ name: 'Mateo Silva', email: 'mateo@barberia.com' });
      console.log('✅ Barberos creados.');
    }

    const usersCount = await User.count();
    if (usersCount === 0) {
      await User.create({
        email: 'carlos@barberia.com',
        password: 'Password123!',
        role: 'BARBER',
        barberId: barber1.id
      });

      await User.create({
        email: 'admin@barberia.com',
        password: 'AdminPassword123!',
        role: 'ADMIN'
      });

      console.log('✅ Usuarios de Carlos y Admin creados.');
    }

    console.log('✅ Base de datos sincronizada y sembrada con éxito.');
  } catch (error) {
    console.error('❌ Error sincronizando la base de datos:', error);
  }
};

module.exports = seedDatabase;