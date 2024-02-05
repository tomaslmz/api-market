import BaseRoutes from './base/BaseRouter';
import UserController from '../controller/UserController';
import { createUserSchema, updateUserSchema } from '../schema/UserSchema';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/create', validate(createUserSchema), UserController.create);
    this.router.patch('/update', isUserLogged, validate(updateUserSchema), UserController.update);
    this.router.delete('/delete', isUserLogged, UserController.delete);
    this.router.get('/search/:id', isUserLogged, UserController.listById);
    this.router.get('/list', isUserLogged, UserController.listAll);
  }
}

export default new UserRoutes().router;