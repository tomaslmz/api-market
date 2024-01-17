import Tag from '../models/Tag';
import Sequelize  from 'sequelize';

interface ITagRepo {
    save(tag: Tag): Promise<void>;
    update(tag: Tag): Promise<void>;
    delete(id: number): Promise<void>;
    listAll(): Promise<Tag[]>;
    listByName(name: string): Promise<Tag>;
}

export default class TagRepo implements ITagRepo {
  async save(tag: Tag): Promise<void> {
    try {
      await Tag.create({
        name: tag.name,
        color: tag.color
      });
    } catch(err: any) {
      if(err instanceof Sequelize.UniqueConstraintError) {
        throw new Error('A tag with this name already exists!');
      }

      throw new Error(`Failed to create an admin! ${err}`);
    }
  }

  async update(tag: Tag): Promise<void> {
    try {
      const newTag = await Tag.findOne({
        where: {
          id: tag.id
        }
      });

      if(!newTag) {
        throw new Error('Tag not found!');
      }

      newTag.name = tag.name;
      newTag.color = tag.color;

      await newTag.save();
    } catch(err) {
      if(err instanceof Sequelize.UniqueConstraintError) {
        throw new Error('A tag with this name already exists!');
      }

      throw new Error(`Failed to update this tag! ${err}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const newTag = await Tag.findOne({
        where: {
          id
        }
      });

      if(!newTag) {
        throw new Error('Tag not found!');
      }

      await newTag.destroy();
    } catch(err) {
      throw new Error(`Failed to delete this tag! ${err}`);
    }
  }
  async listAll(): Promise<Tag[]> {
    try {
      const Tags = await Tag.findAll();

      return Tags;
    } catch(err) {
      throw new Error(`Failed to list all tags! ${err}`);
    }
  }
  async listByName(name: string): Promise<Tag> {
    try {
      const newTag = await Tag.findOne({
        where: {
          name
        }
      });

      if(!newTag) {
        throw new Error('Tag not found!');
      }

      return newTag;
    } catch(err) {
      throw new Error(`Failed to search this tag! ${err}`);
    }
  }
}