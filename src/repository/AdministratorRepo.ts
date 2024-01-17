import Administrator from '../models/Administrator';
import Sequelize from 'sequelize';

interface IAdministratorRepo {
    save(admin: Administrator): Promise<void>;
    update(admin: Administrator): Promise<void>
    delete(id: number): Promise<void>;
    listAll(): Promise<Administrator[]>;
    listById(id: number): Promise<Administrator>;
}

export default class AdministratorRepo implements IAdministratorRepo {
  async save(admin: Administrator): Promise<void> {
    try {
      await Administrator.create({
        name: admin.name,
        email: admin.email,
        password: admin.password
      });
    } catch (err) {
      if(err instanceof Sequelize.UniqueConstraintError) {
        throw new Error('A user with this email already exists!');
      }

      throw new Error(`Failed to create an admin! ${err}`);
    }
  }

  async update(admin: Administrator): Promise<void> {
    try {
      const newAdministrator = await Administrator.findOne({
        where: {
          id: admin.id
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
      const newAdministrator = await Administrator.findOne({
        where: {
          id
        }
      });

      if(!newAdministrator) {
        throw new Error('Admin not found!');
      }

      newAdministrator.destroy();
    } catch (err) {
      throw new Error(`Failed to delete an admin! ${err}`);
    }
  }

  async listAll(): Promise<Administrator[]> {
    try {
      const Administrators = await Administrator.findAll();
      return Administrators;
    } catch (err) {
      throw new Error(`Failed to list all admins! ${err}`);
    }
  }

  async listById(id: number): Promise<Administrator> {
    try {
      const newAdministrator = await Administrator.findOne({
        where: {
          id
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