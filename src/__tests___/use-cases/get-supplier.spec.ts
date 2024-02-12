import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('getting a supplier', () => {
  it('should get a supplier', async () => {
    const oldPassword = uuidv4();

    const newSupplier = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 3
    });

    const token = await getToken(newSupplier.email, oldPassword);
    
    const response = await request(app)
      .get('/api/v1/supplier/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('This supplier data has been fetched successfully!');

    const { id, name, email, password, balance, level_access } = data;

    expect(id).toEqual(newSupplier.id);
    expect(name).toEqual(newSupplier.name);
    expect(email).toEqual(newSupplier.email);
    expect(newSupplier.comparePassword(password)).toBeTruthy();
    expect(balance).toEqual(newSupplier.balance);
    expect(level_access).toEqual(newSupplier.level_access);

    await newSupplier.destroy();
  });
});