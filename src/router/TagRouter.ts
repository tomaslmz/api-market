import BaseRoutes from './base/BaseRouter';
import isUserLogged from '../middlewares/loginRequired';
import validate from '../middlewares/validateSchema';
import { createTagSchema, updateTagSchema } from '../schema/TagSchema';
import TagController from '../controller/TagController';
import isSupplier from '../middlewares/supplierRequired';

class TagRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isUserLogged, isSupplier, validate(createTagSchema), TagController.create);
    this.router.patch('/update/:id', isUserLogged, isSupplier, validate(updateTagSchema), TagController.update);
    this.router.delete('/delete/:id', isUserLogged, isSupplier, TagController.delete);
    this.router.get('/list', TagController.listAll);
    this.router.get('/search/:name', TagController.listByName);
  }
}

export default new TagRoutes().router;