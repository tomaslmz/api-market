import { it, describe, expect,  } from 'vitest';
import request from 'supertest';
import env from '../env';
import Administrator from '../../models/Administrator';
import sequelize from '../database.setup';
import getRandomName from '../utils/randomName';
import getRandomEmail from '../utils/randomEmail';
import app from '../server.setup';


describe('API Administrator endpoints!', () => {
  describe('POST /admin/create', () => {
    it('should create an admin', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const response = await request(app)
        .post('/api/v1/admin/create')
        .set('Authorization', `Bearer ${env.ADMIN_TEST_TOKEN}`)
        .send({ name: name, email: email, password: '12345' })
        .expect(200);

      const responseBody = await response.body;

      expect(responseBody.status).toEqual('Created!');
      expect(responseBody.message).toEqual('Successfully administrator created!');

      sequelize.sync();

      await Administrator.destroy({
        where: {
          email
        }
      });

      const testAdministrator = await Administrator.findOne({
        where: {
          email
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });
});