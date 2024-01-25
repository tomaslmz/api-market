import BaseRoutes from './base/BaseRouter';
import { isSupplierLogged } from '../middlewares/loginRequired';
import validate from '../middlewares/validateSchema';
import { createTagSchema, updateTagSchema } from '../schema/TagSchema';
import TagController from '../controller/TagController';

class TagRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isSupplierLogged, validate(createTagSchema), TagController.create);
    this.router.patch('/update/:id', isSupplierLogged, validate(updateTagSchema), TagController.update);
    this.router.delete('/delete/:id', isSupplierLogged, TagController.delete);
    this.router.get('/list', TagController.listAll);
    this.router.get('/search', TagController.listByName);
  }
}

export default new TagRoutes().router;