const request = require('supertest')(process.env.URL);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
let token = '';
let groupId = '';
let groupUpdated = '';
let showEnergy = false;

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

  describe('Test groups endpoints', () => {
    test('It should get a list of groups', async () => {
      const response = await request.get('/api/admin/localpools').set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body['array']).toBeInstanceOf(Array);
      expect(response.body['array'].length).toBeGreaterThan(0);
      const group = response.body['array'].find(g => g.name === 'People Power Group (Testgruppe)');
      groupId = group.id;
      groupUpdated = group.updated_at;
      showEnergy = group.show_energy;
      console.log('-----');
      console.log(group);
      console.log('-----');
    });

    test('It should update group', async () => {
      showEnergy = !showEnergy;
      const response = await request.patch(`/api/admin/localpools/${groupId}`)
        .set({ Authorization: token })
        .send({ show_energy: showEnergy, updated_at: groupUpdated });
      console.log('+++++');
      console.log(response.body);
      console.log('+++++');
      expect(response.status).toBe(200);
    });
  });
});
