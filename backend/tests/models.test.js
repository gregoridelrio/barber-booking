const { sequelize, Service, Barber } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelos de Base de Datos - Sequelize', () => {
  it('Debe crear y consultar un Servicio correctamente', async () => {
    const service = await Service.create({
      name: 'Corte de Cabello Tradicional',
      durationMinutes: 30,
      price: 15.50
    });

    expect(service.id).toBeDefined();
    expect(service.name).toBe('Corte de Cabello Tradicional');
    expect(Number(service.price)).toBe(15.50);
  });

  it('Debe crear y consultar un Barbero correctamente', async () => {
    const barber = await Barber.create({
      name: 'Carlos Mendoza',
      email: 'carlos@barberia.com'
    });

    expect(barber.id).toBeDefined();
    expect(barber.email).toBe('carlos@barberia.com');
    expect(barber.isActive).toBe(true);
  });
});