import { expect, it, beforeEach } from 'vitest';
import sequelize from '../sequelize.config';
import User from '../../models/User';
import UserRepo from '../../repository/UserRepo';
import getRandomEmail from '../utils/randomEmail';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create an user and store it', async () => {
  const email = getRandomEmail();

  const newUser = new User({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newUser).toBeInstanceOf(User);
  expect(newUser.name).toEqual('test');
  expect(newUser.email).toEqual(email);

  await new UserRepo().save(newUser);

  await User.destroy({
    where: {
      email
    }
  });
});

it('should select an user', async () => {
  const email = getRandomEmail();

  const testUser = await User.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(testUser.name).toEqual('test');
  expect(testUser.email).toEqual(email);

  const newUser = await new UserRepo().listById(testUser.id);

  expect(newUser).toBeInstanceOf(User);
  expect(newUser.name).toEqual('test');
  expect(newUser.email).toEqual(email);

  await testUser.destroy();
});

it('should delete an User', async () => {
  const email = getRandomEmail();

  const newUser = await User.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newUser.name).toEqual('test');
  expect(newUser.email).toEqual(email);

  expect(newUser).toBeInstanceOf(User);

  await new UserRepo().delete(newUser.id);

  const testUser = await User.findOne({
    where: {
      email
    }
  });

  expect(testUser).toBeNull();
});

it('should update an user', async () => {
  const email = getRandomEmail();

  const newUser = await User.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newUser.name).toEqual('test');
  expect(newUser.email).toEqual(email);

  expect(newUser).toBeInstanceOf(User);

  const newEmail = getRandomEmail();

  const updatedUser = new User({
    id: newUser.id,
    name: 'test2',
    email: newEmail,
    password: 'test'
  });

  await new UserRepo().update(updatedUser);

  const testUser = await User.findOne({
    where: {
      email: newEmail
    }
  });

  expect(testUser).toBeInstanceOf(User);
  
  if(testUser) {
    expect(testUser.name).toEqual('test2');
    expect(testUser.email).toEqual(newEmail);
    testUser.destroy();
  }

});