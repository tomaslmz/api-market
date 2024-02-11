import { it, describe, expect,  } from 'vitest';
import request from 'supertest';
import Tag from '../../models/Tag';
import Product from '../../models/Product';
import getToken from '../utils/getToken';
import getRandomName from '../utils/randomName';
import app from '../index.setup';
import getRandomColor from '../utils/randomColor';


describe('API Product endpoints!', async () => {
  const token = await getToken('test@owner.com', 'test');
  describe('POST /product/create', () => {
    it('should create a product', async () => {
      const newTag = await Tag.create({
        name: getRandomName(),
        color: getRandomColor()
      });

      const name = getRandomName();
      const description = getRandomName();
      const price = 0;


      const response = await request(app)
        .post('/api/v1/product/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, description, price, tag_id: newTag.id })
        .expect(200);

      const { status, message } = await response.body;

      expect(status).toEqual('Created!');
      expect(message).toEqual('This product has been created successfully!');

      await Product.destroy({
        where: {
          name
        }
      });

      await newTag.destroy();
    });
  });

  describe('PATCH /product/update', () => {
    it('should update a product', async () => {
      const newTag = await Tag.create({
        name: getRandomName(),
        color: getRandomColor()
      });

      const newProduct = await Product.create({
        name: getRandomName(),
        description: getRandomName(),
        price: 1,
        tag_id: newTag.id
      });

      const name = getRandomName();
      const description = getRandomName();
      const price = 2;

      const response = await request(app)
        .patch(`/api/v1/product/update/${newProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name, description, price, tag_id: newTag.id })
        .expect(200);

      const updatedProduct = await Product.findOne({
        where: {
          name
        }
      });    

      expect(updatedProduct?.name).toEqual(name);
      expect(updatedProduct?.description).toEqual(description);
      expect(updatedProduct?.price).toEqual(price);

      const { status, message } = await response.body;

      expect(status).toEqual('Updated!');
      expect(message).toEqual('This product has been updated successfully!');

      await updatedProduct?.destroy();

      await newTag.destroy();
    });
  });

  describe('DELETE /tag/delete', () => {
    it('should delete a tag', async () => {
      const newTag = await Tag.create({
        name: getRandomName(),
        color: getRandomColor()
      });

      const newProduct = await Product.create({
        name: getRandomName(),
        description: getRandomName(),
        price: 1,
        tag_id: newTag.id
      });

      const response = await request(app)
        .delete(`/api/v1/product/delete/${newProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { status, message } = response.body;

      expect(status).toEqual('Deleted!');
      expect(message).toEqual('This product has been deleted successfully!');

      const testProduct = await Tag.findOne({
        where: {
          id: newTag.id
        }
      });

      expect(testProduct).toBeNull();
    });
  });

  // describe('GET /tag/list', () => {
  //   it('should list all tag', async () => {
  //     const response = await request(app)
  //       .get('/api/v1/tag/list')
  //       .expect(200);

  //     const { status, message, data } = response.body;

  //     expect(status).toEqual('Ok!');
  //     expect(message).toEqual('The tags data has been fetched successfully!');
  //     expect(data).toBeInstanceOf(Object);
  //   });
  // });

  // describe('GET /tag/search', () => {
  //   it('should get a TAG', async () => {
  //     const name = getRandomName();
  //     const color = getRandomColor();

  //     const newTag = await Tag.create({
  //       name,
  //       color
  //     });

  //     const response = await request(app)
  //       .get(`/api/v1/tag/search/${newTag.name}`)
  //       .expect(200);

  //     const { status, message, data } = response.body;

  //     expect(status).toEqual('Ok!');
  //     expect(message).toEqual('This tag data has been fetched successfully!');
  //     expect(data).toBeInstanceOf(Object);

  //     expect(name).toEqual(data.name);
  //     expect(color).toEqual(data.color);

  //     await newTag.destroy();
  //   });
  // });
});