import { Request, Response } from 'express';
import SupplierRepo from '../repository/SupplierRepo';
import User from '../models/User';

class SupplierController {
  async create(req: Request, res: Response) {
    try {
      const newSupplier = new User();

      newSupplier.name = req.body.name;
      newSupplier.email = req.body.email;
      newSupplier.password = req.body.password;

      await new SupplierRepo().save(newSupplier);

      res.status(200).json({
        status: 'Created!',
        message: 'This supplier has been created successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal error server!',
        message: err.message
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const newSupplier = new User();

      const id = req.user.id;

      newSupplier.id = id;
      newSupplier.name = req.body.name;
      newSupplier.email = req.body.email;
      newSupplier.password = req.body.password;

      await new SupplierRepo().update(newSupplier);

      res.status(200).json({
        status: 'Updated!',
        message: 'This supplier has been updated successfully!'
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
      const id = req.user.id;

      await new SupplierRepo().delete(id);

      res.status(200).json({
        status: 'Deleted!',
        message: 'This supplier has been deleted successfully!'
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
      const Suppliers = await new SupplierRepo().listAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'The suppliers data has been fetched successfully!',
        data: Suppliers
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
      const id = req.user.id;

      const supplier = await new SupplierRepo().listById(id);

      res.status(200).json({
        status: 'Ok!',
        message: 'This supplier data has been fetched successfully!',
        data: supplier
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new SupplierController();