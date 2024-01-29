import BaseRoutes from './base/BaseRouter';
import TokenController from '../controller/TokenController';

class TokenRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/admin', TokenController.createAdministrator);
    this.router.post('/supplier', TokenController.createSupplier);
    this.router.post('/user', TokenController.createUser);
  }
}

export default new TokenRoutes().router;