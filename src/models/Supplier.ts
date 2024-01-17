import { Model, Table, Column, DataType, HasOne } from 'sequelize-typescript';
import SupplierPhoto from './SupplierPhoto';

@Table({
  tableName: Supplier.SUPPLIER_TABLE_NAME
})

export default class Supplier extends Model {
  public static SUPPLIER_TABLE_NAME = 'Suppliers' as string;
  public static SUPPLIER_ID = 'id' as string;
  public static SUPPLIER_NAME = 'name' as string;

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

  @HasOne(() => SupplierPhoto)
    photo?: SupplierPhoto;
}