import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import { isAdminLogged } from '../middlewares/loginRequired';
import AdministratorController from '../controller/AdministratorController';
import { createAdministratorSchema, updateAdministratorSchema } from '../schema/AdministratorSchema';

class AdministratorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isAdminLogged, validate(createAdministratorSchema), AdministratorController.create);
    this.router.patch('/update/:id?', isAdminLogged, validate(updateAdministratorSchema), AdministratorController.update);
    this.router.delete('/delete/:id?', isAdminLogged, AdministratorController.delete);
    this.router.get('/list', isAdminLogged, AdministratorController.listAll);
    this.router.get('/search/', isAdminLogged, AdministratorController.listById);
  }
}

export default new AdministratorRoutes().router;