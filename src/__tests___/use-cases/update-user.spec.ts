import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('updating an user', () => {
  it('should update an user', async () => {
    const oldPassword = uuidv4();

    const newUser = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 4
    });

    const token = await getToken(newUser.email, oldPassword);

    const name = uuidv4();
    const email = getRandomEmail();
    const password = uuidv4();

    const response = await request(app)
      .patch('/api/v1/user/update/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, email, password })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Updated!');
    expect(message).toEqual('This user has been updated successfully!');

    const testUser = await User.findOne({
      where: {
        email,
        level_access: 4
      }
    });

    expect(testUser).toBeInstanceOf(User);
    expect(testUser?.name).toEqual(name);
    expect(testUser?.email).toEqual(email);
    expect(testUser?.comparePassword(password)).toBeTruthy();

    await testUser?.destroy();
  });
});