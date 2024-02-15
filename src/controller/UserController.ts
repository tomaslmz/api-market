import User from '../models/User';
import ProductRepo from '../repository/ProductRepo';
import UserRepo from '../repository/UserRepo';
import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = new User();

      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await new UserRepo().save(newUser);

      res.status(200).json({
        status: 'Created!',
        message: 'This user has been created successfully!',
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const newUser = new User();

      newUser.id = req.user.id;
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await new UserRepo().update(newUser);

      res.status(200).json({
        status: 'Updated!',
        message: 'This user has been updated successfully!',
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.user.id;

      await new UserRepo().delete(id);

      res.status(200).json({
        status: 'Deleted!',
        message: 'This user has been deleted successfully!',
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const Users = await new UserRepo().listAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'The users data has been fetched successfully!',
        data: Users
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const Users = await new UserRepo().listById(id);

      res.status(200).json({
        status: 'Ok!',
        message: 'This user data has been fetched successfully!',
        data: Users
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async buyProduct(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const { productId } = req.params;

      const user = await new UserRepo().listById(id);
      const product = await new ProductRepo().listById(parseInt(productId));

      if(!product) {
        throw new Error('This product doesn\'t exist!');
      }

      if(product.price > user.balance) {
        throw new Error('You don\'t sufficient balance to buy this product!');
      }

      user.balance = user.balance - product.price;

      await new UserRepo().update(user);

      res.status(200).json({
        status: 'Purchased product!',
        message: 'This product has been purchased successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message,
      });
    }
  }

  async deposit(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const user = await new UserRepo().listById(id);

      if(!user) {
        throw new Error('User not found!');
      }

      user.balance = user.balance + parseInt(req.params.money);

      await new UserRepo().update(user);

      res.status(200).json({
        status: 'Successfull deposit!',
        message: 'Your money has been deposited successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }
}

export default new UserController();