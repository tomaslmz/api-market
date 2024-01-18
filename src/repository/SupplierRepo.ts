import Supplier from '../models/Supplier';

interface ISupplierRepo {
  save(supplier: Supplier): Promise<void>;
  update(supplier: Supplier): Promise<void>;
  delete(id: number): Promise<void>;
  listAll(): Promise<Supplier[]>;
  listById(id: number): Promise<Supplier>;
}

export default class SupplierRepo implements ISupplierRepo {
  async save(supplier: Supplier): Promise<void> {
    try {
      await Supplier.create({
        name: supplier.name,
      });
    } catch(err: any) {
      throw new Error(`Failed to create a supplier! ${err}`);
    }
  }

  async update(supplier: Supplier): Promise<void> {
    try {
      const newSupplier = await Supplier.findOne({
        where: {
          id: supplier.id
        }
      });

      if(!newSupplier) {
        throw new Error('Supplier not found!');
      }

      newSupplier.name = supplier.name;

      await newSupplier.save();
    } catch(err: any) {
      throw new Error(`Failed to update this supplier! ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newSupplier = await Supplier.findOne({
        where: {
          id
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

  async listAll(): Promise<Supplier[]> {
    try {
      const Suppliers = await Supplier.findAll();

      return Suppliers;
    } catch(err: any) {
      throw new Error(`Failed to list all suppliers! ${err}`);
    }
  }

  async listById(id: number): Promise<Supplier> {
    try {
      const supplier = await Supplier.findOne({
        where: {
          id
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