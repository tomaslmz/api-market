import { it, describe, expect,  } from 'vitest';
import request from 'supertest';
import env from '../env';
import Administrator from '../../models/Administrator';
import sequelize from '../database.setup';
import getRandomName from '../utils/randomName';
import getRandomEmail from '../utils/randomEmail';
import app from '../index.setup';


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

  describe('PATCH /admin/update', () => {
    it('should update an admin', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newAdministrator = await Administrator.create({
        name,
        email,
        password: '24052005'
      });

      const newName = getRandomName();

      const response = await request(app)
        .patch(`/api/v1/admin/update/${newAdministrator.id}`)
        .set('Authorization', `Bearer ${env.ADMIN_TEST_TOKEN}`)
        .send({ name: newName, email, password: '12345' })
        .expect(200);

      const updatedAdministrator = await Administrator.findOne({
        where: {
          email
        }
      });

      expect(updatedAdministrator?.name).toEqual(newName);

      const responseBody = await response.body;

      expect(responseBody.status).toEqual('Updated!');
      expect(responseBody.message).toEqual('Successfully administrator updated!');

      await updatedAdministrator?.destroy();

      const testAdministrator = await Administrator.findOne({
        where: {
          email
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });

  describe('DELETE /admin/delete', () => {
    it('should delete an administrator', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newAdministrator = await Administrator.create({
        name,
        email,
        password: '24052005'
      });
      
      const response = await request(app)
        .delete(`/api/v1/admin/delete/${newAdministrator.id}`)
        .set('Authorization', `Bearer ${env.ADMIN_TEST_TOKEN}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('Successfully administrator deleted!');

      const testAdministrator = await Administrator.findOne({
        where: {
          id: newAdministrator.id
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });
});