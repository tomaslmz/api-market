import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest';

describe('getting all tags', () => {
  it('should get all tags', async () => {
    const response = await request(app)
      .get('/api/v1/tag/list')
      .expect(200);
    
    const { status, message, data } = await response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('The tags data has been fetched successfully!');
    expect(data).toBeInstanceOf(Object);
  });
});