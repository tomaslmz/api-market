import { Response, NextFunction, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../env';
import User from '../models/User';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: number,
      email: string,
      token: string
    }
  }
}

const isUserLogged = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.headers.authorization && !req.cookies.auth) {
      throw new Error('Authorization can not be null!');
    }

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.auth;
    
    const data = jwt.verify(token, env.SECRET_TOKEN) as JwtPayload;

    const { id, email, passwordHash, level_access } = data;

    const testUser = await User.findOne({
      where: {
        email,
        password: passwordHash,
        level_access
      }
    });

    if(!testUser) {
      throw new Error('Invalid token!');
    }

    req.user = { id, email, token };

    next();
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message,
    });
  }
};

export default isUserLogged;