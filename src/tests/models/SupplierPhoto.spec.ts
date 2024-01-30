import { expect, it, beforeEach } from 'vitest';
import sequelize from '../database.setup';
import Supplier from '../../models/Supplier';
import getRandomEmail from '../utils/randomEmail';
import SupplierPhoto from '../../models/SupplierPhoto';
import getRandomName from '../utils/randomName';
import SupplierPhotoRepo from '../../repository/SupplierPhotoRepo';
import getRandomFilename from '../utils/randomFilename';

beforeEach(async () => {
  await sequelize.sync();
});

it('should upload a photo and store it', async () => {
  const email = getRandomEmail();

  const newSupplier = await Supplier.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier).toBeInstanceOf(Supplier);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  const filename = getRandomFilename();

  const newSupplierPhoto = new SupplierPhoto({
    originalName: getRandomName(),
    filename,
    supplier_id: newSupplier.id
  });

  await new SupplierPhotoRepo().save(newSupplierPhoto);

  const testSupplierPhoto = await SupplierPhoto.findOne({
    where: {
      filename
    }
  });

  expect(testSupplierPhoto).toBeInstanceOf(SupplierPhoto);
  
  if(testSupplierPhoto) {
    expect(testSupplierPhoto.originalName).toEqual(newSupplierPhoto.originalName);
    expect(testSupplierPhoto.filename).toEqual(newSupplierPhoto.filename);
    expect(testSupplierPhoto.supplier_id).toEqual(newSupplierPhoto.supplier_id);

    await testSupplierPhoto.destroy();
  }

  await newSupplier.destroy();
});

it('should delete a supplier photo', async () => {
  const email = getRandomEmail();

  const newSupplier = await Supplier.create({
    name: 'test',
    email,
    password: 'test'
  });

  expect(newSupplier).toBeInstanceOf(Supplier);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  const filename = getRandomFilename();

  const newSupplierPhoto = await SupplierPhoto.create({
    originalName: getRandomName(),
    filename,
    supplier_id: newSupplier.id
  });

  await new SupplierPhotoRepo().delete(newSupplierPhoto.id);

  const testSupplierPhoto = await SupplierPhoto.findOne({
    where: {
      filename
    }
  });

  expect(testSupplierPhoto).toBeNull();

  if(testSupplierPhoto) {
    testSupplierPhoto.destroy();
  }

  await newSupplier.destroy();
});