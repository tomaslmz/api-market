import ProductController from '../controller/ProductController';
import isUserLogged from '../middlewares/loginRequired';
import isSupplier from '../middlewares/supplierRequired';
import validate from '../middlewares/validateSchema';
import { createProductSchema, updateProductSchema } from '../schema/ProductSchema';
import BaseRoutes from './base/BaseRouter';

class ProductRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isSupplier, validate(createProductSchema), ProductController.create);
    this.router.patch('/update/:id', isUserLogged, isSupplier, validate(updateProductSchema), ProductController.update);
    this.router.delete('/delete/:id', isUserLogged, isSupplier, ProductController.delete);
    this.router.get('/list', ProductController.listAll);
    this.router.get('/search/:id', ProductController.listById);
  }
}

export default new ProductRoutes().router;