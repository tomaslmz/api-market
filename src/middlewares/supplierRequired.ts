import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import env from '../env';

export const isSupplier = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user.email;

    if(!email) {
      throw new Error('Invalid email!');
    }

    const data = jwt.verify(req.user.token, env.SECRET_TOKEN) as JwtPayload;

    const { level_access } = data;

    if(level_access > 3) {
      throw new Error('You don\'t have permission to access that!');
    }

    const newSupplier = User.findOne({
      where: {
        email,
        level_access
      }
    });

    if(!newSupplier) {
      throw new Error('Invalid supplier!');
    }

    next();
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message
    });
  }
};

export default isSupplier;