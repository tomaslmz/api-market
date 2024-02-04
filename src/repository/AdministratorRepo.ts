import User from '../models/User';
import Sequelize from 'sequelize';
import UserPhoto from '../models/UserPhoto';

interface IAdministratorRepo {
    save(admin: User): Promise<void>;
    update(admin: User): Promise<void>
    delete(id: number): Promise<void>;
    listAll(): Promise<User[]>;
    listById(id: number): Promise<User>;
}

export default class AdministratorRepo implements IAdministratorRepo {
  async save(admin: User): Promise<void> {
    try {
      await User.create({
        name: admin.name,
        email: admin.email,
        password: admin.password,
        level_access: 2
      });
    } catch (err) {
      if(err instanceof Sequelize.UniqueConstraintError) {
        throw new Error('A user with this email already exists!');
      }

      throw new Error(`Failed to create an admin! ${err}`);
    }
  }

  async update(admin: User): Promise<void> {
    try {
      const newAdministrator = await User.findOne({
        where: {
          id: admin.id,
          level_access: 2
        }
      });

      if(!newAdministrator) {
        throw new Error('Admin not found!');
      }

      newAdministrator.name = admin.name;
      newAdministrator.email = admin.email;
      newAdministrator.password = admin.password;

      await newAdministrator.save();
    } catch (err) {
      if(err instanceof Sequelize.UniqueConstraintError) {
        throw new Error('A user with this email already exists!');
      }
            
      throw new Error(`Failed to update an admin! ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newAdministrator = await User.findOne({
        where: {
          id,
          level_access: 2
        }
      });

      if(!newAdministrator) {
        throw new Error('Admin not found!');
      }

      await newAdministrator.destroy();
    } catch (err) {
      throw new Error(`Failed to delete an admin! ${err}`);
    }
  }

  async listAll(): Promise<User[]> {
    try {
      const Administrators = await User.findAll({
        where: {
          level_access: 2
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      return Administrators;
    } catch (err) {
      throw new Error(`Failed to list all admins! ${err}`);
    }
  }

  async listById(id: number): Promise<User> {
    try {
      const newAdministrator = await User.findOne({
        where: {
          id,
          level_access: 2
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      if(!newAdministrator) {
        throw new Error('Admin not found!');
      }

      return newAdministrator;
    } catch (err) {
      throw new Error(`Failed to list an admin! ${err}`);
    }
  }
}