import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('deleting an administrator', () => {
  it('should delete an administrator', async () => {
    const password = uuidv4();

    const newAdministrator = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password,
      level_access: 2
    });

    const token = await getToken(newAdministrator.email, password);

    const response = await request(app)
      .delete('/api/v1/admin/delete')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Deleted!');
    expect(message).toEqual('This administrator has been deleted successfully!');

    const testAdministrator = await User.findOne({
      where: {
        email: newAdministrator.email,
        level_access: 2
      }
    });

    expect(testAdministrator).toBeNull();
  });
});