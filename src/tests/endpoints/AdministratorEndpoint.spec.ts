import { it, describe, expect,  } from 'vitest';
import request from 'supertest';
import getToken from '../utils/getToken';
import getRandomName from '../utils/randomName';
import User from '../../models/User';
import getRandomEmail from '../utils/randomEmail';
import app from '../index.setup';

describe('API Administrator endpoints!', async () => {
  const token = await getToken('test@owner.com', 'test');
  describe('POST /admin/create', () => {
    it('should create an admin', async () => {

      const name = getRandomName();
      const email = getRandomEmail();

      const response = await request(app)
        .post('/api/v1/admin/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: name, email: email, password: '12345' })
        .expect(200);

      const responseBody = await response.body;

      expect(responseBody.status).toEqual('Created!');
      expect(responseBody.message).toEqual('This administrators has been created successfully!');

      await User.destroy({
        where: {
          email,
          level_access: 2
        }
      });

      const testAdministrator = await User.findOne({
        where: {
          email,
          level_access: 2
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });

  describe('PATCH /admin/update', () => {
    it('should update an admin', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newAdministrator = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 2
      });

      const newName = getRandomName();

      const response = await request(app)
        .patch(`/api/v1/admin/update/${newAdministrator.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName, email, password: '12345' })
        .expect(200);

      const updatedAdministrator = await User.findOne({
        where: {
          email,
          level_access: 2
        }
      });

      expect(updatedAdministrator?.name).toEqual(newName);

      const responseBody = await response.body;

      expect(responseBody.status).toEqual('Updated!');
      expect(responseBody.message).toEqual('This administrators has been updated successfully!');

      await updatedAdministrator?.destroy();

      const testAdministrator = await User.findOne({
        where: {
          email,
          level_access: 2
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });

  describe('DELETE /admin/delete', () => {
    it('should delete an administrator', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newAdministrator = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 2
      });
      
      const response = await request(app)
        .delete(`/api/v1/admin/delete/${newAdministrator.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('This administrators has been deleted successfully!');

      const testAdministrator = await User.findOne({
        where: {
          id: newAdministrator.id,
          level_access: 2
        }
      });

      expect(testAdministrator).toBeNull();
    });
  });

  describe('GET /admin/list', () => {
    it('should list all admins if its owner', async () => {

      const response = await request(app)
        .get('/api/v1/admin/list')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('The administrators data has been fetched successfully!');
      expect(data).toBeInstanceOf(Object);
    });
  });

  describe('GET /admin/search', () => {
    it('should get an administrator', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newAdminstrator = await User.create({
        name,
        email,
        password: '12345',
        level_access: 2
      });

      const response = await request(app)
        .get(`/api/v1/admin/search/${newAdminstrator.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('This administrator data has been fetched successfully!');
      expect(data).toBeInstanceOf(Object);

      expect(name).toEqual(data.name);
      expect(email).toEqual(data.email);

      await newAdminstrator.destroy();
    });
  });
});