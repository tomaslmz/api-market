import { Request, Response } from 'express';
import Product from '../models/Product';
import ProductRepo from '../repository/ProductRepo';

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, description, price, discount, tag_id } = req.body;

      const newProduct = new Product({
        name,
        description,
        price,
        discount,
        tag_id
      });

      await new ProductRepo().save(newProduct);

      res.status(200).json({
        status: 'Created!',
        message: 'This product has been created successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, price, discount, tag_id } = req.body;

      const newProduct = new Product({
        id,
        name,
        description,
        price,
        discount,
        tag_id
      });

      await new ProductRepo().update(newProduct);

      res.status(200).json({
        status: 'Updated!',
        message: 'This product has been updated successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await new ProductRepo().delete(parseInt(id));

      res.status(200).json({
        status: 'Deleted!',
        message: 'This product has been deleted successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const Products = await new ProductRepo().listAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'The products data has been fetched successfully!',
        data: Products
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await new ProductRepo().listById(parseInt(id));

      res.status(200).json({
        status: 'Ok!',
        message: 'This product has been fetched data successfully!',
        data: product
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async listByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const products = await new ProductRepo().listByName(name);

      res.status(200).json({
        status: 'Ok!',
        message: 'This product has been fetched data successfully!',
        data: products
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async listByPrice(req: Request, res: Response) {
    try {
      const { min, max } = req.query;

      if (typeof min !== 'string' || typeof max !== 'string') {
        throw new Error('Min and max must be provided as strings');
    }

      const products = await new ProductRepo().listByPrice(parseFloat(min), parseFloat(max));

      res.status(200).json({
        status: 'Ok!',
        message: 'This product has been fetched data successfully!',
        data: products
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new ProductController();