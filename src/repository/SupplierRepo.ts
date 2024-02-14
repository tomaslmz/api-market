import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

interface ISupplierRepo {
  save(supplier: User): Promise<void>;
  update(supplier: User): Promise<void>;
  delete(id: number): Promise<void>;
  listAll(): Promise<User[]>;
  listById(id: number): Promise<User>;
}

export default class SupplierRepo implements ISupplierRepo {
  async save(supplier: User): Promise<void> {
    try {
      await User.create({
        name: supplier.name,
        email: supplier.email,
        password: supplier.password,
        level_access: 3
      });
    } catch(err: any) {
      throw new Error(`Failed to create a supplier! ${err}`);
    }
  }

  async update(supplier: User): Promise<void> {
    try {
      const newSupplier = await User.findOne({
        where: {
          id: supplier.id,
          level_access: 3
        }
      });

      if(!newSupplier) {
        throw new Error('Supplier not found!');
      }

      newSupplier.name = supplier.name;
      newSupplier.email = supplier.email;
      
      if(supplier.password !== '') {
        newSupplier.password = supplier.password;
      }

      await newSupplier.save();
    } catch(err: any) {
      throw new Error(`Failed to update this supplier! ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newSupplier = await User.findOne({
        where: {
          id,
          level_access: 3
        }
      });

      if(!newSupplier) {
        throw new Error('Supplier not found!');
      }

      await newSupplier.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this supplier! ${err}`);
    }
  }

  async listAll(): Promise<User[]> {
    try {
      const Suppliers = await User.findAll({
        where: {
          level_access: 3
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      return Suppliers;
    } catch(err: any) {
      throw new Error(`Failed to list all suppliers! ${err}`);
    }
  }

  async listById(id: number): Promise<User> {
    try {
      const supplier = await User.findOne({
        where: {
          id,
          level_access: 3
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      if(!supplier) {
        throw new Error('Supplier not found!');
      }

      return supplier;
    } catch(err: any) {
      throw new Error(`Failed to find this supplier! ${err}`);
    }
  }
}