import { Response, NextFunction, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface JwtPayLoad {
  id: number,
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: number,
      email: string
    }
  }
}

export const isAdminLogged = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if(!authorization) {
      throw new Error('Authorization can not be null!');
    }

    const [, token] = authorization.split(' ');
  
    const data = jwt.verify(token, process.env.ADMIN_TOKEN as string) as JwtPayLoad;

    const { email, id } = data;

    req.user = { id, email };

    next();
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message
    });
  }
};

export const isSupplierLogged = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if(!authorization) {
      throw new Error('Authorization can not be null!');
    }

    const [, token] = authorization.split(' ');

    const data = jwt.verify(token, process.env.SUPPLIER_TOKEN as string) as JwtPayload;

    const { email, id } = data;

    req.user = { id, email };

    next();
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message,
    });
  }
};