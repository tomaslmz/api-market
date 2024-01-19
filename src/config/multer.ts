import { Request } from 'express';
import multer from 'multer';
import mime from 'mime';
import fs from 'fs';
import { extname, resolve } from 'path';

export default {
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const type = mime.getExtension(file.mimetype);
    const validTypes = ['jpg', 'jpeg', 'png'];

    if(validTypes.includes(`${type}`)) {
      cb(null, true);
    }

    cb(null, false);
  },

  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      if(!fs.readdirSync(resolve(__dirname, '..', '..', 'uploads', 'images'))) {
        fs.mkdirSync(resolve(__dirname, '..', '..', 'uploads', 'images'));
      }

      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },

    filename: (req, file, cb) => {
      const random = () => Math.floor(Math.random() * 10000 + 10000);
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    }
  })
};
