import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';

describe('deleting a tag', () => {
  it('should delete a tag', async () => {
    const token = await getToken('test@owner.com', 'test');

    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const response = await request(app)
      .delete(`/api/v1/tag/delete/${newTag.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    
    const { status, message } = await response.body;

    expect(status).toEqual('Deleted!');
    expect(message).toEqual('This tag has been deleted successfully!');

    const testTag = await Tag.findOne({
      where: {
        name: newTag.name
      }
    });

    expect(testTag).toBeNull();

    await testTag?.destroy();
  });
});