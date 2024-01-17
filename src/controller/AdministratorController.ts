/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Administrator from '../models/Administrator';
import AdministratorRepo from '../repository/AdministratorRepo';
import { encrypt } from '../helper/hash';

declare module 'express-serve-static-core' {
    interface Request {
      user: {
        id: number,
        email: string
      }
    }
  }

class AdministratorController {
  async create(req: Request, res: Response) {
    try {
      if(req.user.id != 1) {
        throw new Error('You don\'t have permission to do that!');
      }
            
      const newAdministrator = new Administrator();

      newAdministrator.name = req.body.name;
      newAdministrator.email = req.body.email;

      const passwordHash = await encrypt(req.body.password);

      newAdministrator.password = passwordHash;

      await new AdministratorRepo().save(newAdministrator);

      res.status(200).json({
        status: 'Created!',
        message: 'Successfully administrator created!'
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
      const id = req.user.id != 1 ? req.user.id : parseInt(req.params.id);
      const newAdministrator = new Administrator();

      newAdministrator.id = id;
      newAdministrator.name = req.body.name;
      newAdministrator.email = req.body.email;
            
      const passwordHash = await encrypt(req.body.password);
      newAdministrator.password = passwordHash;

      await new AdministratorRepo().update(newAdministrator);

      res.status(200).json({
        status: 'Updated!',
        message: 'Successfully administrator updated!'
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

      await new AdministratorRepo().delete(id);

      res.status(200).json({
        status: 'Deleted!',
        message: 'Successfully administrator deleted!'
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
      if(req.user.id != 1) {
        throw new Error('You don\'t have permission to do that!');
      }

      const Administrators = await new AdministratorRepo().listAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched administrator data!',
        data: Administrators
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

      const newAdministrator = await new AdministratorRepo().listById(id);

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched administrator data!',
        data: newAdministrator
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new AdministratorController();