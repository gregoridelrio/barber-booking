require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const seedDatabase = require('./config/seed');

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a MySQL establecida correctamente.');

    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};

startServer();