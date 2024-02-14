import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';
import Product from '../../models/Product';

describe('getting a product by id!', () => {
  it('should get a product by name', async () => {
    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const name = uuidv4();
    const description = uuidv4();
    const price = 1;
    const discount = 0;
    const tag_id = newTag.id;

    const newProduct = await Product.create({
      name,
      description,
      price,
      discount,
      tag_id
    });

    const token = await getToken('test@owner.com', 'test');

    const response = await request(app)
      .get(`/api/v1/product/search/id/${newProduct.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Ok!');
    expect(message).toEqual('This product has been fetched data successfully!');

    expect(name).toEqual(data.name);
    expect(description).toEqual(data.description);
    expect(price).toEqual(data.price);
    expect(discount).toEqual(data.discount);
    expect(tag_id).toEqual(data.tag_id);

    await newTag.destroy();
    await newProduct.destroy();
  });
});
