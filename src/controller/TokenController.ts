/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import Administrator from '../models/Administrator';
import Supplier from '../models/Supplier';

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

      const token = jwt.sign({ id, email }, process.env.ADMIN_TOKEN as string, {
        expiresIn: process.env.TOKEN_EXPIRATION as string
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

      const token = jwt.sign({ id, email }, process.env.SUPPLIER_TOKEN as string, {
        expiresIn: process.env.TOKEN_EXPIRATION as string
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
}

export default new TokenController();