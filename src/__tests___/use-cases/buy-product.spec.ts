import { expect, it, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import getRandomEmail from '../utils/randomEmail';
import getToken from '../utils/getToken';
import request from 'supertest';
import app from '../appTest';
import User from '../../models/User';
import Product from '../../models/Product';
import Tag from '../../models/Tag';
import getRandomColor from '../utils/randomColor';

describe('buy a product', () => {
  it('buy a product', async () => {
    const newTag = await Tag.create({
      name: uuidv4(),
      color: getRandomColor()
    });

    const newProduct = await Product.create({
      name: uuidv4(),
      description: uuidv4(),
      price: 300,
      discount: 0,
      tag_id: newTag.id,
    });

    const password = uuidv4();

    const newUser = await User.create({
      name: uuidv4(),
      email: getRandomEmail(),
      password,
      level_access: 4,
      balance: 300
    });

    const token = await getToken(newUser.email, password);

    const response = await request(app)
      .put(`/api/v1/user/buy/${newProduct.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Purchased product!');
    expect(message).toEqual('This product has been purchased successfully!');

    const testUser = await User.findOne({
      where: {
        email: newUser.email,
        level_access: 4
      }
    });

    expect(testUser?.balance).toEqual(0);

    await testUser?.destroy();
    await newProduct.destroy();
    await newTag.destroy();
  });
});