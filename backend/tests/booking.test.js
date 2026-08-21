const request = require('supertest');
const app = require('../src/app');
const { sequelize, Service, Barber, Appointment } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await Service.create({ id: 1, name: 'Corte Clásico', durationMinutes: 30, price: 15.00 });
  await Barber.create({ id: 1, name: 'Carlos Mendoza', email: 'carlos@barberia.com' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API REST - POST /api/appointments', () => {
  const bookingPayload = {
    barberId: 1,
    serviceId: 1,
    customerName: 'Juan Pérez',
    customerEmail: 'juan@gmail.com',
    customerPhone: '+34600000000',
    startTime: '2026-09-10T10:00:00.000Z'
  };

  it('Debe crear una reserva con éxito cuando el horario está libre', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send(bookingPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.customerName).toBe('Juan Pérez');
  });

  it('Debe rechazar una reserva (409 Conflict) si se intenta solapar con el mismo barbero y horario', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send(bookingPayload);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('ya tiene una cita reservada');
  });
});