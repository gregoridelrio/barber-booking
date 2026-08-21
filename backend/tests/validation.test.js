const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

describe('Middleware de Validación Joi', () => {
  it('Debe devolver 400 Bad Request si el payload de reserva es inválido (email incorrecto)', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({
        barberId: 1,
        serviceId: 1,
        customerName: 'A',
        customerEmail: 'not-an-email',
        customerPhone: '123',
        startTime: 'invalid-date'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('Debe devolver 400 Bad Request si en /api/appointments no se pasa el parámetro date', async () => {
    const validToken = jwt.sign(
      { id: 1, email: 'admin@barberia.com', role: 'ADMIN' },
      process.env.JWT_SECRET || 'super_secret_jwt_key_barberia_2026'
    );

    const res = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty('errors');
  });
});