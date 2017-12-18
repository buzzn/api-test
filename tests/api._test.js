const request = require('supertest')(process.env.URL);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
let token = '';
let groupId = '';

describe('Test the log in', () => {
  test('It should response with token', async () => {
    const response = await request.post('/api/me/login').send({ login: process.env.LOGIN, password: process.env.PASSWORD });
    expect(response.headers['authorization']).toBeTruthy();
    token = response.headers['authorization'];
  });

  test('It should get a user /me', async () => {
    const response = await request.get('/api/me').set({ Authorization: token });
    expect(response.status).toBe(200);
  });

  test('It should get a list of persons', async () => {
    const response = await request.get('/api/admin/persons').set({ Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body['array']).toBeInstanceOf(Array);
    expect(response.body['array'].length).toBeGreaterThan(0);
  });

  test('It should get a list of organizations', async () => {
    const response = await request.get('/api/admin/organizations').set({ Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body['array']).toBeInstanceOf(Array);
    expect(response.body['array'].length).toBeGreaterThan(0);
  });

  describe('Test groups endpoints', () => {
    test('It should get a list of groups', async () => {
      const response = await request.get('/api/admin/localpools').set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
      groupId = response.body['array'][0].id;
    });

    test('It should get registers list', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/registers`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
    });

    test('It should get meters list', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/meters`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
    });

    test('It should get contracts list', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/contracts`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
    });

    test('It should get powertaker contracts list', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/power-taker-contracts`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
    });

    test('It should get localpool persons list', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/persons`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
    });

    test('It should get charts', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/charts?duration=day`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['in']).toBeInstanceOf(Array);
      // expect(response.body['in'].length).toBeGreaterThan(0);
      expect(response.body['out']).toBeInstanceOf(Array);
      // expect(response.body['out'].length).toBeGreaterThan(0);
    });

    test('It should get bubbles', async () => {
      const response = await request.get(`/api/admin/localpools/${groupId}/bubbles`).set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      // expect(response.body['array'].length).toBeGreaterThan(0);
    });
  });
});
