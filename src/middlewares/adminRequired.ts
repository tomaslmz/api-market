import { NextFunction, Request, Response } from 'express';
import Administrator from '../models/Administrator';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user.email;

    if(!email) {
      throw new Error('Invalid email!');
    }

    const newAdministrator = Administrator.findOne({
      where: {
        email
      }
    });

    if(!newAdministrator) {
      throw new Error('Invalid administrator!');
    }

    next();
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message
    });
  }
};

export default isAdmin;