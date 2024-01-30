import { expect, it, beforeEach } from 'vitest';
import sequelize from '../database.setup';
import Administrator from '../../models/Administrator';
import AdministratorRepo from '../../repository/AdministratorRepo';
import getRandomEmail from '../utils/randomEmail';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create an administrator and store it', async () => {
  // await sequelize.sync({ force: true });

  const email = getRandomEmail();

  const newAdministrator = new Administrator({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newAdministrator).toBeInstanceOf(Administrator);
  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  await new AdministratorRepo().save(newAdministrator);

  await Administrator.destroy({
    where: {
      email
    }
  });
});

it('should select an administrator', async () => {
  // await sequelize.sync({ force: true });

  const email = getRandomEmail();

  const testAdministrator = await Administrator.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(testAdministrator.name).toEqual('test');
  expect(testAdministrator.email).toEqual(email);

  const newAdministrator = await new AdministratorRepo().listById(testAdministrator.id);

  expect(newAdministrator).toBeInstanceOf(Administrator);
  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  await testAdministrator.destroy();
});

it('should delete an administrator', async () => {
  // await sequelize.sync({ force: true });

  const email = getRandomEmail();

  const newAdministrator = await Administrator.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  expect(newAdministrator).toBeInstanceOf(Administrator);

  await new AdministratorRepo().delete(newAdministrator.id);

  const testAdministrator = await Administrator.findOne({
    where: {
      email
    }
  });

  expect(testAdministrator).toBeNull();
});

it('should update an administrator', async () => {
  // await sequelize.sync({ force: true });

  const email = getRandomEmail();

  const newAdministrator = await Administrator.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newAdministrator.name).toEqual('test');
  expect(newAdministrator.email).toEqual(email);

  expect(newAdministrator).toBeInstanceOf(Administrator);

  const newEmail = getRandomEmail();

  const updatedAdministrator = new Administrator({
    id: newAdministrator.id,
    name: 'test2',
    email: newEmail,
    password: 'test'
  });

  await new AdministratorRepo().update(updatedAdministrator);

  const testAdministrator = await Administrator.findOne({
    where: {
      email: newEmail
    }
  });

  expect(testAdministrator).toBeInstanceOf(Administrator);
  
  if(testAdministrator) {
    expect(testAdministrator.name).toEqual('test2');
    expect(testAdministrator.email).toEqual(newEmail);
    testAdministrator.destroy();
  }

});