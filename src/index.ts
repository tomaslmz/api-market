import express, { Application, Request, Response } from 'express';
import Database from './config/database';
import { resolve } from 'path';

import AdministratorRouter from './router/AdministratorRouter';
import TokenRouter from './router/TokenRouter';
import TagRouter from './router/TagRouter';
import SupplierRouter from './router/SupplierRouter';
import UserRouter from './router/UserRouter';
import UserPhotoRouter from './router/UserPhotoRouter';
import ProductRouter from './router/ProductRouter';
import ProductPhotoRouter from './router/ProductPhotoRouter';

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
    this.app.use('/api/v1/user/photo', UserPhotoRouter);
    this.app.use('/api/v1/user', UserRouter);
    this.app.use('/api/v1/product', ProductRouter);
    this.app.use('/api/v1/product/photo', ProductPhotoRouter);
  }

  protected connectDatabase(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log('The server is running on http://localhost:8000');
});