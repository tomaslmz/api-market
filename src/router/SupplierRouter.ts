import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import isLogged from '../middlewares/loginRequired';
import { createSupplierSchema, updateSupplierSchema } from '../schema/SupplierSchema';
import SupplierController from '../controller/SupplierController';

class SupplierRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', validate(createSupplierSchema), SupplierController.create);
    this.router.patch('/update', isLogged, validate(updateSupplierSchema), SupplierController.update);
    this.router.delete('/delete', isLogged, SupplierController.delete);
    this.router.get('/list', SupplierController.listAll);
    this.router.get('/search', SupplierController.listById);
  }
}

export default new SupplierRoutes().router;