import { Request, Response } from 'express';
import ProductPhoto from '../models/ProductPhoto';
import ProductPhotoRepo from '../repository/ProductPhotoRepo';
import fs from 'fs';

class ProductPhotoController {
  async create(req: Request, res: Response) {
    try {
      if(!req.file) {
        throw new Error('Photo not found!');
      }

      const newProductPhoto = new ProductPhoto();

      newProductPhoto.originalName = req.file.originalname;
      newProductPhoto.filename = req.file.filename;
      newProductPhoto.product_id = req.body.product_id;

      await new ProductPhotoRepo().save(newProductPhoto);

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
      const newProductPhoto = await ProductPhoto.findOne({
        where: {
          id: req.params.id
        }
      });

      await new ProductPhotoRepo().delete(req.user.id);

      fs.unlink(`./uploads/images/${newProductPhoto?.filename}`, (e) => console.log(e));
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

export default new ProductPhotoController();