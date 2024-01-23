import { Request, Response } from 'express';

class SupplierPhotoController {
  async create(req: Request, res: Response) {
    try {
      if(req.file) {
        res.status(200).json({
          response: req.file
        });
      }
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new SupplierPhotoController();