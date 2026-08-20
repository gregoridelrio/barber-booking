const request = require('supertest');
const app = require('../src/app');
const { sequelize, Service, Barber } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  
  await Service.create({ name: 'Corte Clásico', durationMinutes: 30, price: 15.00 });
  await Barber.create({ name: 'Mateo Silva', email: 'mateo@barberia.com' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API REST - Endpoints Públicos', () => {
  it('GET /api/services - Debe retornar la lista de servicios activos', async () => {
    const res = await request(app).get('/api/services');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Corte Clásico');
  });

  it('GET /api/barbers - Debe retornar la lista de barberos activos', async () => {
    const res = await request(app).get('/api/barbers');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data[0].name).toBe('Mateo Silva');
  });

  it('GET /api/barbers/:barberId/availability - Debe validar formato de fecha YYYY-MM-DD', async () => {
    const res = await request(app).get('/api/barbers/1/availability?date=INVALID_DATE');
    
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/barbers/:barberId/availability - Debe retornar horarios disponibles para una fecha válida', async () => {
    const res = await request(app).get('/api/barbers/1/availability?date=2026-09-01');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.barberId).toBe(1);
    expect(Array.isArray(res.body.data.availableSlots)).toBe(true);
    expect(res.body.data.availableSlots.length).toBeGreaterThan(0);
  });
});