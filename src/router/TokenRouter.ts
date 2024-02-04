import BaseRoutes from './base/BaseRouter';
import TokenController from '../controller/TokenController';

class TokenRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/', TokenController.create);
  }
}

export default new TokenRoutes().router;