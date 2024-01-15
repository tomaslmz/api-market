import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validate';
import isLogged from '../middlewares/loginRequired';
import AdministratorController from '../controller/AdministratorController';
import { createAdministratorSchema, updateAdministratorSchema } from '../schema/AdministratorSchema';

class AdministratorRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/create', isLogged, validate(createAdministratorSchema), AdministratorController.create);
        this.router.patch('/update/:id', isLogged, validate(updateAdministratorSchema), AdministratorController.update);
        this.router.delete('/delete/:id', isLogged, AdministratorController.delete);
        this.router.get('/list', isLogged, AdministratorController.listAll);
        this.router.get('/list/:id', isLogged, AdministratorController.listById);
    }
}

export default new AdministratorRoutes().router;