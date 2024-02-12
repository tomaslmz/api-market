import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('getting an user', () => {
  it('should get an user', async () => {
    const oldPassword = uuidv4();

    const newUser = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 4
    });

    const token = await getToken(newUser.email, oldPassword);
    
    const response = await request(app)
      .get('/api/v1/user/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('This user data has been fetched successfully!');

    const { id, name, email, password, balance, level_access } = data;

    expect(id).toEqual(newUser.id);
    expect(name).toEqual(newUser.name);
    expect(email).toEqual(newUser.email);
    expect(newUser.comparePassword(password)).toBeTruthy();
    expect(balance).toEqual(newUser.balance);
    expect(level_access).toEqual(newUser.level_access);

    await newUser.destroy();
  });
});