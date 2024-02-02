import express, { Application, Request, Response } from 'express';
import sequelize from './database.setup';
import { resolve } from 'path';

import AdministratorRouter from '../router/AdministratorRouter';
import TokenRouter from '../router/TokenRouter';
import TagRouter from '../router/TagRouter';
import SupplierRouter from '../router/SupplierRouter';
import SupplierPhotoRouter from '../router/SupplierPhotoRouter';
import UserRouter from '../router/UserRouter';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectDatabase();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('Hello world!');
    });

    this.app.use('/api/v1/admin', AdministratorRouter);
    this.app.use('/api/v1/token', TokenRouter);
    this.app.use('/api/v1/tag', TagRouter);
    this.app.use('/api/v1/supplier', SupplierRouter);
    this.app.use('/api/v1/supplier/photo', SupplierPhotoRouter);
    this.app.use('/api/v1/user', UserRouter);
  }

  protected connectDatabase(): void {
    sequelize.sync();
  }
}

const app = new App().app;

export default app;