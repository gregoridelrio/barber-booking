const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('Debe responder con estado 200 y status OK', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});