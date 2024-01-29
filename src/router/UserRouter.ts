import BaseRoutes from './base/BaseRouter';
import UserController from '../controller/UserController';
import { createUserSchema, updateUserSchema } from '../schema/UserSchema';
import validate from '../middlewares/validateSchema';

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/create', validate(createUserSchema), UserController.create);
    this.router.patch('/update', validate(updateUserSchema), UserController.update);
    this.router.delete('/delete', UserController.delete);
    this.router.get('/list', UserController.listById);
  }
}

export default new UserRoutes().router;