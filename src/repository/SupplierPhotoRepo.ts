import SupplierPhoto from '../models/SupplierPhoto';

interface ISupplierPhotoRepo {
  save(supplierPhoto: SupplierPhoto): Promise<void>;
  delete(id: number): Promise<void>;
}

export default class SupplierPhotoRepo implements ISupplierPhotoRepo {
  async save(supplierPhoto: SupplierPhoto) {
    try {
      await SupplierPhoto.create({
        originalName: supplierPhoto.originalName,
        filename: supplierPhoto.filename,
        supplier_id: supplierPhoto.supplier_id
      });
    } catch(err: any) {
      throw new Error(`Failed to upload this supplier photo! ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const newSupplierPhoto = await SupplierPhoto.findOne({
        where: {
          id
        }
      });

      if(!newSupplierPhoto) {
        throw new Error('Supplier photo not found!');
      }

      newSupplierPhoto.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this photo! ${err}`);
    }
  }
}