import ProductPhoto from '../models/ProductPhoto';

interface IProductPhotoRepo {
  save(productPhoto: ProductPhoto): Promise<void>;
  delete(id: number): Promise<void>;
}

export default class ProductPhotoRepo implements IProductPhotoRepo {
  async save(product: ProductPhoto) {
    try {
      await ProductPhoto.create({
        originalName: product.originalName,
        filename: product.filename,
        product_id: product.product_id
      });
    } catch(err: any) {
      throw new Error(`Failed to upload this product photo! ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const newProductPhoto = await ProductPhoto.findOne({
        where: {
          id
        }
      });

      if(!newProductPhoto) {
        throw new Error('Product photo not found!');
      }

      newProductPhoto.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this photo! ${err}`);
    }
  }
}