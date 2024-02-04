import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';
import AdministratorController from '../controller/AdministratorController';
import isAdmin from '../middlewares/adminRequired';
import { createAdministratorSchema, updateAdministratorSchema } from '../schema/AdministratorSchema';

class AdministratorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isAdmin, validate(createAdministratorSchema), AdministratorController.create);
    this.router.patch('/update/:id?', isUserLogged, isAdmin, validate(updateAdministratorSchema), AdministratorController.update);
    this.router.delete('/delete/:id?', isUserLogged, isAdmin, AdministratorController.delete);
    this.router.get('/list', isUserLogged, isAdmin, AdministratorController.listAll);
    this.router.get('/search/:id?', isUserLogged, isAdmin, AdministratorController.listById);
  }
}

export default new AdministratorRoutes().router;