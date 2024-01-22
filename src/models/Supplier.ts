import { Model, Table, Column, DataType, HasOne, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import SupplierPhoto from './SupplierPhoto';
import { hash, compare } from 'bcrypt';

@Table({
  tableName: Supplier.SUPPLIER_TABLE_NAME
})

export default class Supplier extends Model {
  public static SUPPLIER_TABLE_NAME = 'Suppliers' as string;
  public static SUPPLIER_ID = 'id' as string;
  public static SUPPLIER_NAME = 'name' as string;
  public static SUPPLIER_EMAIL = 'email' as string;
  public static SUPPLIER_PASSWORD = 'password';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Supplier.SUPPLIER_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: Supplier.SUPPLIER_NAME
  }) name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: Supplier.SUPPLIER_EMAIL
  }) email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: Supplier.SUPPLIER_PASSWORD
  }) password!: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: Supplier): Promise<void> {
    const passwordHash = await hash(instance.password, 8);
    instance.password = passwordHash;
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  @HasOne(() => SupplierPhoto)
    photo?: SupplierPhoto;
}