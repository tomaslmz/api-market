import Product from '../models/Product';
import ProductPhoto from '../models/ProductPhoto';
import Tag from '../models/Tag';
import { Op } from 'sequelize';

interface IProductRepo {
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>
  delete(id: number): Promise<void>;
  listAll(): Promise<Product[]>;
  listById(id: number): Promise<Product>;
  listByName(name: string): Promise<Product[]>;
  listByPrice(min: number, max: number): Promise<Product[]>;
}


export default class ProductRepo implements IProductRepo {
  async save(product: Product): Promise<void> {
    try {
      const testTag = await Tag.findOne({
        where: {
          id: product.tag_id
        }
      });

      if(!testTag) {
        throw new Error('Tag not found!');
      }

      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        tag_id: product.tag_id
      });
    } catch(err: any) {
      throw new Error(`Failed to create a product! ${err}`);
    }
  }

  async update(product: Product): Promise<void> {
    try {
      const newProduct = await Product.findOne({
        where: {
          id: product.id
        }
      });

      if(!newProduct) {
        throw new Error('Product not found!');
      }

      const testTag = await Tag.findOne({
        where: {
          id: product.tag_id
        }
      });

      if(!testTag) {
        throw new Error('Tag not found!');
      }

      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.discount = product.discount;
      newProduct.tag_id = product.tag_id;

      await newProduct.save();
    } catch(err: any) {
      throw new Error(`Failed to update this product! ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const testProduct = await Product.findOne({
        where: {
          id
        },
        include: {
          model: ProductPhoto,
          as: 'photos',
        }
      });

      if(!testProduct) {
        throw new Error('Product not found!');
      }

      await testProduct.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this product! ${err}`);
    }
  }

  async listAll(): Promise<Product[]> {
    try {
      const Products = await Product.findAll({
        include: {
          model: ProductPhoto,
          as: 'photos',
        }
      });

      return Products;
    } catch(err: any) {
      throw new Error(`Failed to list all products! ${err}`);
    }
  }

  async listById(id: number): Promise<Product> {
    try {
      const testProduct = await Product.findOne({
        where: {
          id
        },
        include: {
          model: ProductPhoto,
          as: 'photos',
        }
      });

      if(!testProduct) {
        throw new Error('Product not found!');
      }

      return testProduct;
    } catch(err: any) {
      throw new Error(`Failed to find this product! ${err}`);
    }
  }

  async listByName(name: string): Promise<Product[]> {
    try {
      const testProduct = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        include: {
          model: ProductPhoto,
          as: 'photos',
        }
      });

      if(!testProduct) {
        throw new Error('Product not found!');
      }

      return testProduct;
    } catch(err: any) {
      throw new Error(`Failed to find this product! ${err}`);
    }
  }

  async listByPrice(min: number, max: number): Promise<Product[]> {
    try {
      const testProduct = await Product.findAll({
        where: {
          price: {
            [Op.between]: [min, max]
          }
        },
        include: {
          model: ProductPhoto,
          as: 'photos',
        }
      });

      if(!testProduct) {
        throw new Error('Product not found!');
      }

      return testProduct;
    } catch(err: any) {
      throw new Error(`Failed to find this product! ${err}`);
    }
  }
}
