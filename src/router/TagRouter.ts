import BaseRoutes from './base/BaseRouter';
import isLogged from '../middlewares/loginRequired';
import validate from '../middlewares/validate';
import { createTagSchema, updateTagSchema } from '../schema/TagSchema';
import TagController from '../controller/TagController';

class TagRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', isLogged, validate(createTagSchema), TagController.create);
    this.router.patch('/update/:id', isLogged, validate(updateTagSchema), TagController.update);
    this.router.delete('/delete/:id', isLogged, TagController.delete);
    this.router.get('/list', isLogged, TagController.listAll);
    this.router.get('/search', isLogged, TagController.listByName);
  }
}

export default new TagRoutes().router;