import { expect, it, describe,  } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('updating an administrator', () => {
  it('should update an administrator', async () => {
    const oldPassword = uuidv4();

    const newAdministrator = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 2
    });

    const token = await getToken(newAdministrator.email, oldPassword);

    const name = uuidv4();
    const email = getRandomEmail();
    const password = uuidv4();

    const response = await request(app)
      .patch('/api/v1/admin/update/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, email, password })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Updated!');
    expect(message).toEqual('This administrator has been updated successfully!');

    const testAdministrator = await User.findOne({
      where: {
        email,
        level_access: 2
      }
    });

    expect(testAdministrator).toBeInstanceOf(User);
    expect(testAdministrator?.name).toEqual(name);
    expect(testAdministrator?.email).toEqual(email);
    expect(testAdministrator?.comparePassword(password)).toBeTruthy();

    await testAdministrator?.destroy();
  });
});