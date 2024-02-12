import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('updating a supplier', () => {
  it('should update a supplier', async () => {
    const oldPassword = uuidv4();

    const newSupplier = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password: oldPassword,
      level_access: 3
    });

    const token = await getToken(newSupplier.email, oldPassword);

    const name = uuidv4();
    const email = getRandomEmail();
    const password = uuidv4();

    const response = await request(app)
      .patch('/api/v1/supplier/update/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, email, password })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Updated!');
    expect(message).toEqual('This supplier has been updated successfully!');

    const testSupplier = await User.findOne({
      where: {
        email,
        level_access: 3
      }
    });

    expect(testSupplier).toBeInstanceOf(User);
    expect(testSupplier?.name).toEqual(name);
    expect(testSupplier?.email).toEqual(email);
    expect(testSupplier?.comparePassword(password)).toBeTruthy();

    await testSupplier?.destroy();
  });
});