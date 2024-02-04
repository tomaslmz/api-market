import TagRepo from '../repository/TagRepo';
import Tag from '../models/Tag';
import { Request, Response } from 'express';

class TagController {
  async create(req: Request, res: Response) {
    try {
      const newTag = new Tag();

      newTag.name = req.body.name;
      newTag.color = req.body.color;

      await new TagRepo().save(newTag);

      res.status(200).json({
        status: 'Created!',
        message: 'Tag successfully created!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const newTag = new Tag();

      newTag.id = id;
      newTag.name = req.body.name;
      newTag.color = req.body.color;

      await new TagRepo().update(newTag);

      res.status(200).json({
        status: 'Updated!',
        message: 'Tag successfully updated!',
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await new TagRepo().delete(id);

      res.status(200).json({
        status: 'Deleted!',
        message: 'Tag successfully deleted!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    } 
  }

  async listAll(req: Request, res: Response) {
    try {
      const Tags = await Tag.findAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched tags data!',
        data: Tags
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async listByName(req: Request, res: Response) {
    try {
      const name = req.params.name;

      const newTag = await new TagRepo().listByName(name);

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched tag data!',
        data: newTag
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }
}

export default new TagController();