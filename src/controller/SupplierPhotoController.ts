import { Request, Response } from 'express';
import SupplierPhotoRepo from '../repository/SupplierPhotoRepo';
import SupplierPhoto from '../models/SupplierPhoto';
import fs from 'fs';

class SupplierPhotoController {
  async create(req: Request, res: Response) {
    try {
      if(!req.file) {
        throw new Error('Photo not found!');
      }

      const newSupplierPhoto = new SupplierPhoto();

      newSupplierPhoto.originalName = req.file.originalname;
      newSupplierPhoto.filename = req.file.filename;
      newSupplierPhoto.supplier_id = req.user.id;

      await new SupplierPhotoRepo().save(newSupplierPhoto);

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
      const newSupplierPhoto = await SupplierPhoto.findOne({
        where: {
          id: req.user.id
        }
      });

      await new SupplierPhotoRepo().delete(req.user.id);

      fs.unlink(`./uploads/images/${newSupplierPhoto?.filename}`, (e) => console.log(e));
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