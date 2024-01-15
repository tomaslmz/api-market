import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validate';
import AdministratorController from '../controller/AdministratorController';
import { createAdministratorSchema, updateAdministratorSchema } from '../schema/AdministratorSchema';

class AdministratorRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/create', validate(createAdministratorSchema), AdministratorController.create);
        this.router.patch('/update/:id', validate(updateAdministratorSchema), AdministratorController.update);
        this.router.delete('/delete/:id', AdministratorController.delete);
        this.router.get('/list', AdministratorController.listAll);
        this.router.get('/list/:id', AdministratorController.listById);
    }
}

export default new AdministratorRoutes().router;