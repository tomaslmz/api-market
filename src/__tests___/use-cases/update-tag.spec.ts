import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';

describe('updating a tag', () => {
  it('should update a tag', async () => {
    const token = await getToken('test@owner.com', 'test');

    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const name = uuidv4();
    const color = getRandomColor();

    const response = await request(app)
      .patch(`/api/v1/tag/update/${newTag.id}`)
      .send({ name, color })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    
    const { status, message } = await response.body;

    expect(status).toEqual('Updated!');
    expect(message).toEqual('This tag has been updated successfully!');

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