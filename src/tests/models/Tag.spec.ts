import { expect, it } from 'vitest';
import sequelize from '../database.setup';
import Tag from '../../models/Tag';
import TagRepo from '../../repository/TagRepo';
import getRandomColor from '../utils/randomColor';
import getRandomName from '../utils/randomName';
import { beforeEach } from 'node:test';

beforeEach(async () => {
  await sequelize.sync();
});

it('should create an Tag and store it', async () => {
  // await sequelize.sync({ force: false });

  const name = getRandomName();
  const color = getRandomColor();

  const newTag = new Tag({
    name,
    color,
  });

  expect(newTag).toBeInstanceOf(Tag);
  expect(newTag.name).toEqual(name);
  expect(newTag.color).toEqual(color);

  await new TagRepo().save(newTag);

  await Tag.destroy({
    where: {
      color
    }
  });
});

it('should select an Tag', async () => {
  // await sequelize.sync({ force: false });

  const name = getRandomName();
  const color = getRandomColor();

  const testTag = await Tag.create({
    name,
    color
  });

  expect(testTag.name).toEqual(name);
  expect(testTag.color).toEqual(color);

  const newTag = await new TagRepo().listByName(testTag.name);

  expect(newTag).toBeInstanceOf(Tag);
  expect(newTag.name).toEqual(name);
  expect(newTag.color).toEqual(color);

  await testTag.destroy();
});

it('should delete an Tag', async () => {
  // await sequelize.sync({ force: false });

  const name = getRandomName();
  const color = getRandomColor();

  const newTag = await Tag.create({
    name,
    color,
  });

  expect(newTag.name).toEqual(name);
  expect(newTag.color).toEqual(color);

  expect(newTag).toBeInstanceOf(Tag);

  await new TagRepo().delete(newTag.id);

  const testTag = await Tag.findOne({
    where: {
      color
    }
  });

  expect(testTag).toBeNull();
});

it('should update an Tag', async () => {
  // await sequelize.sync({ force: false });

  const name = getRandomName();
  const color = getRandomColor();

  const newTag = await Tag.create({
    name,
    color
  });

  expect(newTag.name).toEqual(name);
  expect(newTag.color).toEqual(color);

  expect(newTag).toBeInstanceOf(Tag);

  const newName = getRandomName();
  const newColor = getRandomColor();

  const updatedTag = new Tag({
    id: newTag.id,
    name: newName,
    color: newColor,
  });

  await new TagRepo().update(updatedTag);

  const testTag = await Tag.findOne({
    where: {
      name: newName
    }
  });

  expect(testTag).toBeInstanceOf(Tag);
  
  if(testTag) {
    expect(testTag.name).toEqual(newName);
    expect(testTag.color).toEqual(newColor);
    testTag.destroy();
  }
});