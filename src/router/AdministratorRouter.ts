import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';
import AdministratorController from '../controller/AdministratorController';
import isAdmin from '../middlewares/adminRequired';
import { createAdministratorSchema, updateAdministratorSchema } from '../schema/AdministratorSchema';
import isOwner from '../middlewares/ownerRequired';

class AdministratorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isOwner, validate(createAdministratorSchema), AdministratorController.create);
    this.router.patch('/update', isUserLogged, isAdmin, validate(updateAdministratorSchema), AdministratorController.update);
    this.router.delete('/delete', isUserLogged, isAdmin, AdministratorController.delete);
    this.router.get('/list', isUserLogged, isAdmin, AdministratorController.listAll);
    this.router.get('/search', isUserLogged, isAdmin, AdministratorController.listById);
  }
}

export default new AdministratorRoutes().router;