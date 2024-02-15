import BaseRoutes from './base/BaseRouter';
import TokenController from '../controller/TokenController';

class TokenRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/', TokenController.create);
    this.router.delete('/', TokenController.delete);
  }
}

export default new TokenRoutes().router;