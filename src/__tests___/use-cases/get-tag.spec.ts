import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';

describe('getting a tag', () => {
  it('should get a tag', async () => {

    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const response = await request(app)
      .get(`/api/v1/tag/search/${newTag.name}`)
      .expect(200);
    
    const { status, message, data } = await response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('This tag data has been fetched successfully!');

    expect(newTag).toBeInstanceOf(Tag);
    expect(newTag.id).toEqual(data.id);
    expect(newTag.name).toEqual(data.name);
    expect(newTag.color).toEqual(data.color);

    await newTag.destroy();
  });
});