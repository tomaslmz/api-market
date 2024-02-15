import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

interface iUserRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
  listAll(): Promise<User[]>;
  listById(id: number): Promise<User>;
}

export default class UserRepo implements iUserRepo {
  async save(user: User): Promise<void> {
    try {
      await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        level_access: 4
      });

    } catch(err: any) {
      throw new Error(`Failed to create this user! ${err}`);
    }
  }

  async update(user: User): Promise<void> {
    try {
      const newUser = await User.findOne({
        where: {
          id: user.id,
        }
      });

      if(!newUser) {
        throw new Error('User not found!');
      }

      newUser.name = user.name;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.balance = user.balance;

      await newUser.save();
    } catch(err: any) {
      throw new Error(`Failed to update this user! ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newUser = await User.findOne({
        where: {
          id,
          level_access: 4
        }
      });

      if(!newUser) {
        throw new Error('User not found!');
      }

      await newUser.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this user! ${err}`);
    }
  }

  async listAll(): Promise<User[]> {
    try {
      return await User.findAll({
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });
    } catch(err: any) {
      throw new Error(`Failed to list all users! ${err}`);
    }
  }

  async listById(id: number): Promise<User> {
    try {
      const newUser = await User.findOne({
        where: {
          id
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      if(!newUser) {
        throw new Error('User not found!');
      }

      return newUser;
    }  catch(err: any) {
      throw new Error(`Failed to list this user! ${err}`);
    }   
  }
}