import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest';

describe('getting all products', () => {
  it('should get all products', async () => {
    const response = await request(app)
      .get('/api/v1/product/list')
      .expect(200);
    
    const { status, message, data } = await response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('The products data has been fetched successfully!');
    expect(data).toBeInstanceOf(Object);
  });
});