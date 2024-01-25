import BaseRoutes from './base/BaseRouter';
import multer from 'multer';
import multerConfig from '../config/multer';
import { isSupplierLogged } from '../middlewares/loginRequired';
import SupplierPhotoController from '../controller/SupplierPhotoController';

class SupplierPhotoRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/upload', isSupplierLogged, multer(multerConfig).single('photo'), SupplierPhotoController.create);
    this.router.delete('/delete', isSupplierLogged, SupplierPhotoController.delete);
  }
}

export default new SupplierPhotoRoutes().router;