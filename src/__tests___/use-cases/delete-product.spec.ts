import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';
import Product from '../../models/Product';

describe('deleting a product!', () => {
  it('should delete a product', async () => {
    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const newProduct = await Product.create({
      name: uuidv4(),
      description: uuidv4(),
      price: 1,
      discount: 0,
      tag_id: newTag.id,
    });

    const token = await getToken('test@owner.com', 'test');

    const response = await request(app)
      .delete(`/api/v1/product/delete/${newProduct.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Deleted!');
    expect(message).toEqual('This product has been deleted successfully!');

    const testProduct = await Product.findOne({
      where: {
        name: newProduct.name
      }
    });

    expect(testProduct).toBeNull();

    await newTag.destroy();
  });
});
