import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('creating a supplier!', () => {
  it('should create a supplier', async () => {
    const token = await getToken('test@owner.com', 'test');

    const name = uuidv4();
    const email = getRandomEmail();
    const password = uuidv4();

    const response = await request(app)
      .post('/api/v1/supplier/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, email, password })
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Created!');
    expect(message).toEqual('This supplier has been created successfully!');

    const testSupplier = await User.findOne({
      where: {
        email,
        level_access: 3
      }
    });

    expect(testSupplier).toBeInstanceOf(User);
    expect(testSupplier?.name).toEqual(name);
    expect(testSupplier?.email).toEqual(email);

    await testSupplier?.destroy();
  });
});
