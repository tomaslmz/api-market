import { expect, it, beforeEach } from 'vitest';
import sequelize from '../sequelize.config';
import User from '../../models/User';
import AdministratorRepo from '../../repository/AdministratorRepo';
import getRandomEmail from '../utils/randomEmail';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create an administrator and store it', async () => {
  const email = getRandomEmail();

  const newAdministrator = new User({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newAdministrator).toBeInstanceOf(User);
  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  await new AdministratorRepo().save(newAdministrator);

  await User.destroy({
    where: {
      email,
      level_access: 2
    }
  });
});

it('should select an administrator', async () => {
  const email = getRandomEmail();

  const testAdministrator = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 2
  });

  expect(testAdministrator.name).toEqual('test');
  expect(testAdministrator.email).toEqual(email);

  const newAdministrator = await new AdministratorRepo().listById(testAdministrator.id);

  expect(newAdministrator).toBeInstanceOf(User);
  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  await testAdministrator.destroy();
});

it('should delete an administrator', async () => {
  const email = getRandomEmail();

  const newAdministrator = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 2
  });

  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  expect(newAdministrator).toBeInstanceOf(User);

  await new AdministratorRepo().delete(newAdministrator.id);

  const testAdministrator = await User.findOne({
    where: {
      email
    }
  });

  expect(testAdministrator).toBeNull();
});

it('should update an administrator', async () => {
  const email = getRandomEmail();

  const newAdministrator = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 2
  });

  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  expect(newAdministrator).toBeInstanceOf(User);

  const newEmail = getRandomEmail();

  const updatedAdministrator = new User({
    id: newAdministrator.id,
    name: 'test2',
    email: newEmail,
    password: 'test',
    level_access: 2
  });

  await new AdministratorRepo().update(updatedAdministrator);

  const testAdministrator = await User.findOne({
    where: {
      email: newEmail
    }
  });

  expect(testAdministrator).toBeInstanceOf(User);
  
  if(testAdministrator) {
    expect(testAdministrator.name).toEqual('test2');
    expect(testAdministrator.email).toEqual(newEmail);
    testAdministrator.destroy();
  }

});