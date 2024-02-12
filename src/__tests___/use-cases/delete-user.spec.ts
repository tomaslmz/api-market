import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';

describe('deleting an user', () => {
  it('should delete an user', async () => {
    const password = uuidv4();

    const newUser = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password,
      level_access: 4
    });

    const token = await getToken(newUser.email, password);

    const response = await request(app)
      .delete('/api/v1/user/delete')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Deleted!');
    expect(message).toEqual('This user has been deleted successfully!');

    const testUser = await User.findOne({
      where: {
        email: newUser.email,
        level_access: 4
      }
    });

    expect(testUser).toBeNull();
  });
});