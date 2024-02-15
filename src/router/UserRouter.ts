import BaseRoutes from './base/BaseRouter';
import UserController from '../controller/UserController';
import { buyProductUserSchema, createUserSchema, depositUserSchema, updateUserSchema } from '../schema/UserSchema';
import validate from '../middlewares/validateSchema';
import isUserLogged from '../middlewares/loginRequired';

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/create', validate(createUserSchema), UserController.create);
    this.router.patch('/update', isUserLogged, validate(updateUserSchema), UserController.update);
    this.router.delete('/delete', isUserLogged, UserController.delete);
    this.router.get('/search', isUserLogged, UserController.listById);
    this.router.get('/list', isUserLogged, UserController.listAll);
    this.router.put('/buy/:productId', isUserLogged, validate(buyProductUserSchema), UserController.buyProduct);
    this.router.put('/deposit/:money', isUserLogged, validate(depositUserSchema), UserController.deposit);
  }
}

export default new UserRoutes().router;