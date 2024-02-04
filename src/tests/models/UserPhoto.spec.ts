import { expect, it, beforeEach } from 'vitest';
import sequelize from '../database/sequelize.config';
import getRandomEmail from '../utils/randomEmail';
import UserPhoto from '../../models/UserPhoto';
import getRandomName from '../utils/randomName';
import UserPhotoRepo from '../../repository/UserPhotoRepo';
import getRandomFilename from '../utils/randomFilename';
import User from '../../models/User';

beforeEach(async () => {
  await sequelize.sync();
});

it('should upload a photo and store it', async () => {
  const email = getRandomEmail();

  const newSupplier = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 3
  });

  expect(newSupplier).toBeInstanceOf(User);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  const filename = getRandomFilename();

  const newUserPhoto = new UserPhoto({
    originalName: getRandomName(),
    filename,
    user_id: newSupplier.id
  });

  await new UserPhotoRepo().save(newUserPhoto);

  const testUserPhoto = await UserPhoto.findOne({
    where: {
      filename
    }
  });

  expect(testUserPhoto).toBeInstanceOf(UserPhoto);
  
  if(testUserPhoto) {
    expect(testUserPhoto.originalName).toEqual(newUserPhoto.originalName);
    expect(testUserPhoto.filename).toEqual(newUserPhoto.filename);
    expect(testUserPhoto.user_id).toEqual(newUserPhoto.user_id);

    await testUserPhoto.destroy();
  }

  await newSupplier.destroy();
});

it('should delete a supplier photo', async () => {
  const email = getRandomEmail();

  const newSupplier = await User.create({
    name: 'test',
    email,
    password: 'test',
    level_access: 3
  });

  expect(newSupplier).toBeInstanceOf(User);
  expect(newSupplier.name).toEqual('test');
  expect(newSupplier.email).toEqual(email);

  const filename = getRandomFilename();

  const newUserPhoto = await UserPhoto.create({
    originalName: getRandomName(),
    filename,
    user_id: newSupplier.id
  });

  await new UserPhotoRepo().delete(newUserPhoto.id);

  const testUserPhoto = await UserPhoto.findOne({
    where: {
      filename
    }
  });

  expect(testUserPhoto).toBeNull();

  if(testUserPhoto) {
    testUserPhoto.destroy();
  }

  await newSupplier.destroy();
});