import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';
import { extname, resolve } from 'path';

const MAX_FILE_SIZE = 50000000;

export default {
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp') {
      return cb(new Error('The file is not a image!'));
    }

    if(file.size >= MAX_FILE_SIZE) {
      return cb(new Error('The file should be lower than 5mb!'));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      if(!fs.readdirSync(resolve('uploads', 'images'))) {
        fs.mkdirSync(resolve('uploads', 'images'));
      }

      cb(null, resolve('uploads', 'images'));
    },

    filename: (req, file, cb) => {
      const random = () => Math.floor(Math.random() * 10000 + 10000);
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    }
  })
};
