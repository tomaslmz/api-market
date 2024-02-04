import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';
import isAdmin from '../middlewares/adminRequired';
import { createSupplierSchema, updateSupplierSchema } from '../schema/SupplierSchema';
import SupplierController from '../controller/SupplierController';

class SupplierRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isAdmin, validate(createSupplierSchema), SupplierController.create);
    this.router.patch('/update', isUserLogged, validate(updateSupplierSchema), SupplierController.update);
    this.router.delete('/delete', isUserLogged, SupplierController.delete);
    this.router.get('/list', isUserLogged, SupplierController.listAll);
    this.router.get('/search', isUserLogged, SupplierController.listById);
  }
}

export default new SupplierRoutes().router;