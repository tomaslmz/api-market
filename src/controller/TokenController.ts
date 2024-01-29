/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../env';

import Administrator from '../models/Administrator';
import Supplier from '../models/Supplier';
import User from '../models/User';

declare module 'express-serve-static-core' {
    interface Request {
      user: {
        id: number,
        email: string
      }
    }
  }

class TokenController {
  async createAdministrator(req: Request, res: Response) {
    try {
      const { email = '', password = '' } = req.body;

      if(!email || !password) {
        throw new Error('Insert a valid login!');
      }

      const newAdministrator = await Administrator.findOne({
        where: {
          email
        }
      });

      if(!newAdministrator) {
        throw new Error('Admin not found!');
      }
      
      const correctPassword = await newAdministrator.comparePassword(password);
      
      if(!correctPassword) {
        throw new Error('The password is incorrect!');
      }
      
      const { id } = newAdministrator;

      const token = jwt.sign({ id, email }, env.ADMIN_TOKEN, {
        expiresIn: env.TOKEN_EXPIRATION
      });

      req.user = { id, email };

      return res.json({ 
        status: 'Ok!',
        message: 'Token has been created successfull',
        data: {
          token,
          user: {
            id: newAdministrator.id,
            name: newAdministrator.name,
            email: newAdministrator.email
          }
        }
      });
    } catch(err: any) {
      return res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async createSupplier(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        throw new Error('Insert a valid login!');
      }

      const newSupplier = await Supplier.findOne({
        where: {
          email
        }
      });

      if(!newSupplier) {
        throw new Error('Supplier not found!');
      }

      const isPasswordCorrect = newSupplier.comparePassword(password);

      if(!isPasswordCorrect) {
        throw new Error('The password is incorrect!');
      }

      const { id } = newSupplier;

      const token = jwt.sign({ id, email }, env.SUPPLIER_TOKEN, {
        expiresIn: env.TOKEN_EXPIRATION
      });

      req.user = { id, email };

      return res.status(200).json({
        status: 'Ok!',
        message: 'Token has been created successfully!',
        data: {
          token,
          user: {
            id: newSupplier.id,
            email: newSupplier.email
          }
        }
      });
    } catch(err: any) {
      return res.status(500).json({
        status: 'Internal server error!',
        message: err.any
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        throw new Error('Insert a valid login!');
      }

      const newUser = await User.findOne({
        where: {
          email
        }
      });

      if(!newUser) {
        throw new Error('User not found!');
      }

      const isPasswordCorrect = newUser.comparePassword(password);

      if(!isPasswordCorrect) {
        throw new Error('The password is incorrect!');
      }

      const { id } = newUser;

      req.body.user =  { id, email };

      const token = jwt.sign({ id, email }, env.USER_TOKEN, {
        expiresIn: env.TOKEN_EXPIRATION
      });

      return res.status(200).json({
        status: 'Ok!',
        message: 'Token has been created successfully!',
        data: {
          token,
          user: {
            id: newUser.id,
            email: newUser.email
          }
        }
      });
    } catch(err: any) {
      return res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new TokenController();