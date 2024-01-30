import { expect, it, beforeEach } from 'vitest';
import sequelize from '../database.setup';
import Supplier from '../../models/Supplier';
import SupplierRepo from '../../repository/SupplierRepo';
import getRandomEmail from '../utils/randomEmail';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create a supplier and store it', async () => {
  const email = getRandomEmail();

  const newSupplier = new Supplier({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier).toBeInstanceOf(Supplier);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  await new SupplierRepo().save(newSupplier);

  await Supplier.destroy({
    where: {
      email
    }
  });
});

it('should select a supplier', async () => {
  const email = getRandomEmail();

  const testSupplier = await Supplier.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(testSupplier.name).toEqual('test');
  expect(testSupplier.email).toEqual(email);

  const newSupplier = await new SupplierRepo().listById(testSupplier.id);

  expect(newSupplier).toBeInstanceOf(Supplier);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  await testSupplier.destroy();
});

it('should delete a supplier', async () => {
  const email = getRandomEmail();

  const newSupplier = await Supplier.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  expect(newSupplier).toBeInstanceOf(Supplier);

  await new SupplierRepo().delete(newSupplier.id);

  const testSupplier = await Supplier.findOne({
    where: {
      email
    }
  });

  expect(testSupplier).toBeNull();
});

it('should update a supplier', async () => {
  const email = getRandomEmail();

  const newSupplier = await Supplier.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  expect(newSupplier).toBeInstanceOf(Supplier);

  const newEmail = getRandomEmail();

  const updatedSupplier = new Supplier({
    id: newSupplier.id,
    name: 'test2',
    email: newEmail,
    password: 'test'
  });

  await new SupplierRepo().update(updatedSupplier);

  const testSupplier = await Supplier.findOne({
    where: {
      email: newEmail
    }
  });

  expect(testSupplier).toBeInstanceOf(Supplier);
  
  if(testSupplier) {
    expect(testSupplier.name).toEqual('test2');
    expect(testSupplier.email).toEqual(newEmail);
    testSupplier.destroy();
  }

});