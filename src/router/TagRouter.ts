import BaseRoutes from './base/BaseRouter';
import isLogged from '../middlewares/loginRequired';
import validate from '../middlewares/validate';
import { createTagSchema, updateTagSchema } from '../schema/TagSchema';
import TagController from '../controller/TagController';
import isAdmin from '../middlewares/adminRequired';

class TagRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isLogged, isAdmin, validate(createTagSchema), TagController.create);
    this.router.patch('/update/:id', isLogged, isAdmin, validate(updateTagSchema), TagController.update);
    this.router.delete('/delete/:id', isLogged, isAdmin, TagController.delete);
    this.router.get('/list', isLogged, isAdmin, TagController.listAll);
    this.router.get('/search', isLogged, isAdmin, TagController.listByName);
  }
}

export default new TagRoutes().router;