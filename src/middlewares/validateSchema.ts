import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = 
  (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params
        });

        return next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch(err: any) {
        const errorMessage = JSON.parse(err.message);

        if(errorMessage[0].message !== 'Required') {
          return res.status(400).json({
            status: 'Bad request!',
            message: errorMessage[0].message,
          });
        }
        return res.status(400).json({
          status: 'Bad request!',
          message: `A valid ${errorMessage[0].path[1]} is required!`,
        });
      }
    };

export default validate;