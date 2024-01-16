import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

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

const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: 'Authorization can not be null!'
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN as string) as JwtPayLoad;

    const { email, id } = data;

    req.user = { id, email };

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(err: any) {
    return res.status(500).json({
      status: 'Internal server error!',
      message: err.message
    });
  }
};

export default isLogged;