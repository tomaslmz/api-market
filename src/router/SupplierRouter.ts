import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';
import isAdmin from '../middlewares/adminRequired';
import { createSupplierSchema, updateSupplierSchema } from '../schema/SupplierSchema';
import SupplierController from '../controller/SupplierController';
import isSupplier from '../middlewares/supplierRequired';

class SupplierRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isAdmin, validate(createSupplierSchema), SupplierController.create);
    this.router.patch('/update/:id?', isUserLogged, isSupplier, validate(updateSupplierSchema), SupplierController.update);
    this.router.delete('/delete/:id?', isUserLogged, isSupplier, SupplierController.delete);
    this.router.get('/list', SupplierController.listAll);
    this.router.get('/search/:id?', isUserLogged, isSupplier, SupplierController.listById);
  }
}

export default new SupplierRoutes().router;