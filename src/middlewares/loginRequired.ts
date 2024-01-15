import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayLoad {
  id: string,
  email: string
}

interface CustomRequest extends Request { 
  userId?: string,
  userEmail?: string
}

const isLogged = (req: CustomRequest, res: Response, next: NextFunction) => {
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
      
        const { id, email } = data;

        req.userId = id;
        req.userEmail = email;

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