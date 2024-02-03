import { Request, Response } from 'express';
import UserPhotoRepo from '../repository/UserPhotoRepo';
import UserPhoto from '../models/UserPhoto';
import fs from 'fs';

class SupplierPhotoController {
  async create(req: Request, res: Response) {
    try {
      if(!req.file) {
        throw new Error('Photo not found!');
      }

      const newSupplierPhoto = new UserPhoto();

      newSupplierPhoto.originalName = req.file.originalname;
      newSupplierPhoto.filename = req.file.filename;
      newSupplierPhoto.user_id = req.user.id;

      await new UserPhotoRepo().save(newSupplierPhoto);

      res.status(200).json({
        status: 'Uploaded!',
        message: 'This photo has been upload successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const newUserPhoto = await UserPhoto.findOne({
        where: {
          id: req.user.id
        }
      });

      await new UserPhotoRepo().delete(req.user.id);

      fs.unlink(`./uploads/images/${newUserPhoto?.filename}`, (e) => console.log(e));
      res.status(200).json({
        status: 'Deleted!',
        message: 'This photo has been deleted successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new SupplierPhotoController();