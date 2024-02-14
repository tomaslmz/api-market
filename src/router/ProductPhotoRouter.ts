import multer from 'multer';
import BaseRoutes from './base/BaseRouter';
import multerConfig from '../config/multer';
import ProductPhotoController from '../controller/ProductPhotoController';
import isSupplier from '../middlewares/supplierRequired';
import isUserLogged from '../middlewares/loginRequired';

class ProductPhotoRoutes extends BaseRoutes{
  public routes(): void {
    this.router.post('/create', isUserLogged, isSupplier, multer(multerConfig).single('photo'), ProductPhotoController.create);
    this.router.delete('/delete/:id', isUserLogged, isSupplier, ProductPhotoController.delete);
  }
}

export default new ProductPhotoRoutes().router;