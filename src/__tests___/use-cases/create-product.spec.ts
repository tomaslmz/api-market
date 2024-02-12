import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';
import Product from '../../models/Product';

describe('creating a product!', () => {
  it('should create a product', async () => {
    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const token = await getToken('test@owner.com', 'test');

    const name = uuidv4();
    const description = uuidv4();
    const price = 1;
    const discount = 0;
    const tag_id = newTag.id;

    const response = await request(app)
      .post('/api/v1/product/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, description, price, discount, tag_id })
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Created!');
    expect(message).toEqual('This product has been created successfully!');

    const testProduct = await Product.findOne({
      where: {
        name,
      }
    });

    expect(testProduct).toBeInstanceOf(Product);
    expect(testProduct?.name).toEqual(name);
    expect(testProduct?.description).toEqual(description);
    expect(testProduct?.price).toEqual(price);
    expect(testProduct?.discount).toEqual(discount);
    expect(testProduct?.tag_id).toEqual(tag_id);

    await testProduct?.destroy();
    await newTag.destroy();
  });
});
