import BaseRoutes from './base/BaseRouter';
import multer from 'multer';
import multerConfig from '../config/multer';
import UserPhotoController from '../controller/UserPhotoController';
import isUserLogged from '../middlewares/loginRequired';

class SupplierPhotoRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/upload', isUserLogged, multer(multerConfig).single('photo'), UserPhotoController.create);
    this.router.delete('/delete', isUserLogged, UserPhotoController.delete);
  }
}

export default new SupplierPhotoRoutes().router;