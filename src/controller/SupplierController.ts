import { Request, Response } from 'express';
import SupplierRepo from '../repository/SupplierRepo';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import env from '../env';

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
        message: 'Supplier has been created successfully!'
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

      const data = jwt.verify(req.user.token, env.SECRET_TOKEN) as JwtPayload;
      const { level_access } = data;

      const id = level_access <= 2 ? parseInt(req.params.id) : req.user.id;

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
      const data = jwt.verify(req.user.token, env.SECRET_TOKEN) as JwtPayload;
      const { level_access } = data;

      const id = level_access <= 2 ? parseInt(req.params.id) : req.user.id;

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
        message: 'Successfully fetched suppliers data!',
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
      const data = jwt.verify(req.user.token, env.SECRET_TOKEN) as JwtPayload;
      const { level_access } = data;

      const id = level_access <= 2 ? parseInt(req.params.id) : req.user.id;

      const supplier = await new SupplierRepo().listById(id);

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched this supplier data!',
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