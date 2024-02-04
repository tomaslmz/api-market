import { it, describe, expect  } from 'vitest';
import request from 'supertest';
import getToken from '../utils/getToken';
import getRandomName from '../utils/randomName';
import User from '../../models/User';
import getRandomEmail from '../utils/randomEmail';
import app from '../index.setup';

describe('API supplier endpoints!', async () => {
  const token = await getToken('test@owner.com', 'test');
  describe('POST /supplier/create', () => {
    it('should create a supplier', async () => {

      const name = getRandomName();
      const email = getRandomEmail();

      const response = await request(app)
        .post('/api/v1/supplier/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, email, password: '12345' })
        .expect(200);

      const { status, message } = await response.body;

      expect(status).toEqual('Created!');
      expect(message).toEqual('Supplier has been created successfully!');

      console.log(email, name);

      await User.destroy({
        where: {
          email,
          level_access: 3
        }
      });

      const testSupplier = await User.findOne({
        where: {
          email,
          level_access: 3
        }
      });

      expect(testSupplier).toBeNull();
    });
  });

  describe('PATCH /supplier/update', () => {
    it('should update a supplier', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newSupplier = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 3
      });

      const newName = getRandomName();
      const newEmail = getRandomEmail();

      const response = await request(app)
        .patch(`/api/v1/supplier/update/${newSupplier.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName, email: newEmail, password: '12345' })
        .expect(200);

      const updatedSupplier = await User.findOne({
        where: {
          id: newSupplier.id,
          level_access: 3
        }
      });

      expect(updatedSupplier?.name).toEqual(newName);
      expect(updatedSupplier?.email).toEqual(newEmail);

      const { status, message } = await response.body;

      expect(status).toEqual('Updated!');
      expect(message).toEqual('This supplier has been updated successfully!');

      await updatedSupplier?.destroy();

      const testSupplier = await User.findOne({
        where: {
          id: newSupplier.id,
          level_access: 3
        }
      });

      expect(testSupplier).toBeNull();
    });
  });

  describe('DELETE /supplier/delete', () => {
    it('should delete a supplier', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newSupplier = await User.create({
        name,
        email,
        password: '24052005',
        level_access: 3
      });
      
      const response = await request(app)
        .delete(`/api/v1/supplier/delete/${newSupplier.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('This supplier has been deleted successfully!');

      const testSupplier = await User.findOne({
        where: {
          id: newSupplier.id,
          level_access: 3
        }
      });

      expect(testSupplier).toBeNull();
    });
  });

  describe('GET /supplier/list', () => {
    it('should list all supplier', async () => {

      const response = await request(app)
        .get('/api/v1/supplier/list')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('Successfully fetched suppliers data!');
      expect(data).toBeInstanceOf(Object);
    });
  });

  describe('GET /supplier/search', () => {
    it('should get a supplier', async () => {
      const name = getRandomName();
      const email = getRandomEmail();

      const newSupplier = await User.create({
        name,
        email,
        password: '12345',
        level_access: 3
      });

      const response = await request(app)
        .get(`/api/v1/supplier/search/${newSupplier.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('Successfully fetched this supplier data!');
      expect(data).toBeInstanceOf(Object);

      expect(name).toEqual(data.name);
      expect(email).toEqual(data.email);

      await newSupplier.destroy();
    });
  });
});