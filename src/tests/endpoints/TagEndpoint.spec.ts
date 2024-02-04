import { it, describe, expect,  } from 'vitest';
import request from 'supertest';
import Tag from '../../models/Tag';
import getToken from '../utils/getToken';
import getRandomName from '../utils/randomName';
import app from '../index.setup';
import getRandomColor from '../utils/randomColor';


describe('API Tag endpoints!', async () => {
  const token = await getToken('test@owner.com', 'test');
  describe('POST /tag/create', () => {
    it('should create a tag', async () => {
      const name = getRandomName();
      const color = getRandomColor();

      const response = await request(app)
        .post('/api/v1/tag/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, color })
        .expect(200);

      const { status, message } = await response.body;

      expect(status).toEqual('Created!');
      expect(message).toEqual('Tag successfully created!');

      await Tag.destroy({
        where: {
          name
        }
      });

      const testTag = await Tag.findOne({
        where: {
          name
        }
      });

      expect(testTag).toBeNull();
    });
  });

  describe('PATCH /tag/update', () => {
    it('should update a tag', async () => {
      const name = getRandomName();
      const color = getRandomColor();

      const newTag = await Tag.create({
        name,
        color
      });

      const newColor = getRandomColor();

      const response = await request(app)
        .patch(`/api/v1/tag/update/${newTag.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name, color: newColor })
        .expect(200);

      const updatedTag = await Tag.findOne({
        where: {
          color: newColor
        }
      });

      expect(updatedTag?.color).toEqual(newColor);

      const { status, message } = await response.body;

      expect(status).toEqual('Updated!');
      expect(message).toEqual('Tag successfully updated!');

      await updatedTag?.destroy();

      const testTag = await Tag.findOne({
        where: {
          name
        }
      });

      expect(testTag).toBeNull();
    });
  });

  describe('DELETE /tag/delete', () => {
    it('should delete a tag', async () => {
      const name = getRandomName();
      const color = getRandomColor();

      const newTag = await Tag.create({
        name,
        color
      });
      
      const response = await request(app)
        .delete(`/api/v1/tag/delete/${newTag.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('Tag successfully deleted!');

      const testTag = await Tag.findOne({
        where: {
          id: newTag.id
        }
      });

      expect(testTag).toBeNull();
    });
  });

  describe('GET /tag/list', () => {
    it('should list all tag', async () => {
      const response = await request(app)
        .get('/api/v1/tag/list')
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('Successfully fetched tags data!');
      expect(data).toBeInstanceOf(Object);
    });
  });

  describe('GET /tag/search', () => {
    it('should get a TAG', async () => {
      const name = getRandomName();
      const color = getRandomColor();

      const newTag = await Tag.create({
        name,
        color
      });

      const response = await request(app)
        .get(`/api/v1/tag/search/${newTag.name}`)
        .expect(200);

      const { status, message, data } = response.body;

      expect(status).toEqual('Ok!');
      expect(message).toEqual('Successfully fetched tag data!');
      expect(data).toBeInstanceOf(Object);

      expect(name).toEqual(data.name);
      expect(color).toEqual(data.color);

      await newTag.destroy();
    });
  });
});