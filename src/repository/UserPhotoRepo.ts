import UserPhoto from '../models/UserPhoto';

interface ISupplierPhotoRepo {
  save(userPhoto: UserPhoto): Promise<void>;
  delete(id: number): Promise<void>;
}

export default class SupplierPhotoRepo implements ISupplierPhotoRepo {
  async save(userPhoto: UserPhoto) {
    try {
      await UserPhoto.create({
        originalName: userPhoto.originalName,
        filename: userPhoto.filename,
        user_id: userPhoto.user_id
      });
    } catch(err: any) {
      throw new Error(`Failed to upload this supplier photo! ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const newUserPhoto = await UserPhoto.findOne({
        where: {
          id
        }
      });

      if(!newUserPhoto) {
        throw new Error('Supplier photo not found!');
      }

      newUserPhoto.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this photo! ${err}`);
    }
  }
}