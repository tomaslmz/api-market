import { it, describe, expect  } from 'vitest';
import request from 'supertest';
import getToken from '../utils/getToken';
import getRandomName from '../utils/randomName';
import User from '../../models/User';
import getRandomEmail from '../utils/randomEmail';
import app from '../index.setup';

describe('API user endpoints!', async () => {
  describe('POST /user/create', () => {
    it('should create a user', async () => {

      const name = getRandomName();
      const email = getRandomEmail();

      const response = await request(app)
        .post('/api/v1/user/create')
        .send({ name, email, password: '12345' })
        .expect(200);

      const { status, message } = await response.body;

      expect(status).toEqual('Created!');
      expect(message).toEqual('This user has been created successfully!');

      await User.destroy({
        where: {
          email,
          level_access: 4
        }
      });

      const testUser = await User.findOne({
        where: {
          email,
          level_access: 4
        }
      });

      expect(testUser).toBeNull();
    });
  });

  describe('PATCH /user/update', () => {
    it('should update a user', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newUser = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 4
      });

      const newName = getRandomName();
      const newEmail = getRandomEmail();

      const token = await getToken(email, '24052005');
      const response = await request(app)
        .patch('/api/v1/user/update/')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName, email: newEmail, password: '24052005' })
        .expect(200);

      const { status, message } = await response.body;

      expect(status).toEqual('Updated!');
      expect(message).toEqual('This user has been updated successfully!');

      const updatedUser = await User.findOne({
        where: {
          id: newUser.id,
          level_access: 4
        }
      });

      expect(updatedUser?.name).toEqual(newName);
      expect(updatedUser?.email).toEqual(newEmail);

     

      await updatedUser?.destroy();

      const testUser = await User.findOne({
        where: {
          id: newUser.id,
          level_access: 4
        }
      });

      expect(testUser).toBeNull();
    });
  });

  describe('DELETE /user/delete', () => {
    it('should delete a user', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newUser = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 4
      });

      const token = await getToken(email, '24052005');
      
      const response = await request(app)
        .delete('/api/v1/user/delete/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('This user has been deleted successfully!');

      const testUser = await User.findOne({
        where: {
          id: newUser.id,
          level_access: 4
        }
      });

      expect(testUser).toBeNull();
    });
  });

  describe('GET /user/list', () => {
    it('should list all user', async () => {

      const name = getRandomName();
      const email = getRandomEmail();

      const newUser = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 4
      });
      
      const token = await getToken(email, '24052005');

      const response = await request(app)
        .get('/api/v1/user/list')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('The users data has been fetched successfully!');
      expect(data).toBeInstanceOf(Object);

      await newUser.destroy();
    });
  });

  describe('GET /user/search', () => {
    it('should get a user', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newUser = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 4
      });

      const token = await getToken(email, '24052005');

      const response = await request(app)
        .get('/api/v1/user/search')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('This user data has been fetched successfully!');
      expect(data).toBeInstanceOf(Object);

      expect(name).toEqual(data.name);
      expect(email).toEqual(data.email);

      await newUser.destroy();
    });
  });
});