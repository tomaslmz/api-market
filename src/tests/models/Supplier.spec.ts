import { expect, it, beforeEach } from 'vitest';
import sequelize from '../sequelize.config';
import User from '../../models/User';
import SupplierRepo from '../../repository/SupplierRepo';
import getRandomEmail from '../utils/randomEmail';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create a supplier and store it', async () => {
  const email = getRandomEmail();

  const newSupplier = new User({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier).toBeInstanceOf(User);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  await new SupplierRepo().save(newSupplier);

  await User.destroy({
    where: {
      email,
      level_access: 3
    }
  });
});

it('should select a supplier', async () => {
  const email = getRandomEmail();

  const testSupplier = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 3
  });

  expect(testSupplier.name).toEqual('test');
  expect(testSupplier.email).toEqual(email);

  const newSupplier = await new SupplierRepo().listById(testSupplier.id);

  expect(newSupplier).toBeInstanceOf(User);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  await testSupplier.destroy();
});

it('should delete a supplier', async () => {
  const email = getRandomEmail();

  const newSupplier = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 3
  });

  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  expect(newSupplier).toBeInstanceOf(User);

  await new SupplierRepo().delete(newSupplier.id);

  const testSupplier = await User.findOne({
    where: {
      email,
      level_access: 3
    }
  });

  expect(testSupplier).toBeNull();
});

it('should update a supplier', async () => {
  const email = getRandomEmail();

  const newSupplier = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 3
  });

  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  expect(newSupplier).toBeInstanceOf(User);

  const newEmail = getRandomEmail();

  const updatedSupplier = new User({
    id: newSupplier.id,
    name: 'test2',
    email: newEmail,
    password: 'test'
  });

  await new SupplierRepo().update(updatedSupplier);

  const testSupplier = await User.findOne({
    where: {
      email: newEmail,
      level_access: 3
    }
  });

  expect(testSupplier).toBeInstanceOf(User);
  
  if(testSupplier) {
    expect(testSupplier.name).toEqual('test2');
    expect(testSupplier.email).toEqual(newEmail);
    testSupplier.destroy();
  }
});