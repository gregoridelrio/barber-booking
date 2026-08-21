const request = require('supertest');
const app = require('../src/app');
const { sequelize, User, Barber } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const barber = await Barber.create({ id: 1, name: 'Carlos Mendoza', email: 'carlos@barberia.com' });
  await User.create({
    email: 'carlos@barberia.com',
    password: 'Password123!',
    role: 'BARBER',
    barberId: barber.id
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API REST - Autenticación y Endpoints Privados', () => {
  let authToken = '';

  it('POST /api/auth/login - Debe rechazar credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'carlos@barberia.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/auth/login - Debe autenticar y devolver un token JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'carlos@barberia.com', password: 'Password123!' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    
    authToken = res.body.data.token;
  });

  it('GET /api/appointments - Debe denegar acceso sin token JWT (401)', async () => {
    const res = await request(app).get('/api/appointments?date=2026-09-10');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/appointments - Debe autorizar el acceso cuando se pasa un token JWT válido', async () => {
    const res = await request(app)
      .get('/api/appointments?date=2026-09-10')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});