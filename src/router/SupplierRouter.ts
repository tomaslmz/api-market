import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import { isAdminLogged, isSupplierLogged } from '../middlewares/loginRequired';
import { createSupplierSchema, updateSupplierSchema } from '../schema/SupplierSchema';
import SupplierController from '../controller/SupplierController';

class SupplierRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isAdminLogged, validate(createSupplierSchema), SupplierController.create);
    this.router.patch('/update', isSupplierLogged, validate(updateSupplierSchema), SupplierController.update);
    this.router.delete('/delete', isSupplierLogged, SupplierController.delete);
    this.router.get('/list', isSupplierLogged, SupplierController.listAll);
    this.router.get('/search', isSupplierLogged, SupplierController.listById);
  }
}

export default new SupplierRoutes().router;