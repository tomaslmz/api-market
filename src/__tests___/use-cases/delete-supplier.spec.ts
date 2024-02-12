import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('deleting a supplier', () => {
  it('should delete a supplier', async () => {
    const password = uuidv4();

    const newSupplier = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password,
      level_access: 3
    });

    const token = await getToken(newSupplier.email, password);

    const response = await request(app)
      .delete('/api/v1/supplier/delete')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Deleted!');
    expect(message).toEqual('This supplier has been deleted successfully!');

    const testSupplier = await User.findOne({
      where: {
        email: newSupplier.email,
        level_access: 3
      }
    });

    expect(testSupplier).toBeNull();
  });
});