import { expect, it, describe } from 'vitest';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';

describe('getting all administrators', () => {
  it('should get all administrators', async () => {
    const token = await getToken('test@owner.com', 'test');
    const response = await request(app)
      .get('/api/v1/admin/list')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    
    const { status, message, data } = await response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('The administrators data has been fetched successfully!');
    expect(data).toBeInstanceOf(Object);
  });
});