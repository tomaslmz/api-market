import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';

describe('creating a tag', () => {
  it('should create a tag', async () => {
    const token = await getToken('test@owner.com', 'test');

    const name = uuidv4();
    const color = getRandomColor();

    const response = await request(app)
      .post('/api/v1/tag/create')
      .send({ name, color })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    
    const { status, message } = await response.body;

    expect(status).toEqual('Created!');
    expect(message).toEqual('This tag has been created successfully!');

    const testTag = await Tag.findOne({
      where: {
        name
      }
    });

    expect(testTag).toBeInstanceOf(Tag);
    expect(testTag?.name).toEqual(name);
    expect(testTag?.color).toEqual(color);

    await testTag?.destroy();
  });
});