import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('getting an administrator', () => {
  it('should get an administrator', async () => {
    const oldPassword = uuidv4();

    const newAdministrator = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 2
    });

    const token = await getToken(newAdministrator.email, oldPassword);
    
    const response = await request(app)
      .get('/api/v1/admin/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('This administrator data has been fetched successfully!');

    const { id, name, email, password, balance, level_access } = data;

    expect(id).toEqual(newAdministrator.id);
    expect(name).toEqual(newAdministrator.name);
    expect(email).toEqual(newAdministrator.email);
    expect(newAdministrator.comparePassword(password)).toBeTruthy();
    expect(balance).toEqual(newAdministrator.balance);
    expect(level_access).toEqual(newAdministrator.level_access);

    await newAdministrator.destroy();
  });
});