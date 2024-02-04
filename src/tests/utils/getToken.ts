import request from 'supertest';
import app from '../index.setup';

const getToken = async (email: string, password: string) => {
  const response = await request(app)
    .post('/api/v1/token')
    .send({ email, password });

  return response.body.data.token;
};

export default getToken;