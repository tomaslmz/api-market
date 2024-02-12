import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('creating an user!', () => {
  it('should create an user', async () => {
    const name = uuidv4();
    const email = getRandomEmail();
    const password = uuidv4();

    const response = await request(app)
      .post('/api/v1/user/create')
      .send({ name, email, password })
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Created!');
    expect(message).toEqual('This user has been created successfully!');

    const testUser = await User.findOne({
      where: {
        email,
        level_access: 4
      }
    });

    expect(testUser).toBeInstanceOf(User);
    expect(testUser?.name).toEqual(name);
    expect(testUser?.email).toEqual(email);

    await testUser?.destroy();
  });
});
