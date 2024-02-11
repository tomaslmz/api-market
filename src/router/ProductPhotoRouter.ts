import multer from 'multer';
import BaseRoutes from './base/BaseRouter';
import multerConfig from '../config/multer';
import ProductPhotoController from '../controller/ProductPhotoController';
import isSupplier from '../middlewares/supplierRequired';

class ProductPhotoRoutes extends BaseRoutes{
  public routes(): void {
    this.router.post('/create', isSupplier, multer(multerConfig).single('photo'), ProductPhotoController.create);
    this.router.delete('/delete/:id', isSupplier, ProductPhotoController.delete);
  }
}

export default new ProductPhotoRoutes().router;