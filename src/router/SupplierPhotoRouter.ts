import BaseRoutes from './base/BaseRouter';
import multer from 'multer';
import multerConfig from '../config/multer';
import SupplierPhotoController from '../controller/SupplierPhotoController';

class SupplierPhotoRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/upload', multer(multerConfig).single('photo'), SupplierPhotoController.create);
    this.router.delete('/delete', SupplierPhotoController.delete);
  }
}

export default new SupplierPhotoRoutes().router;