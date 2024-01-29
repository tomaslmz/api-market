import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import env from '../env';
import Supplier from './Supplier';

@Table({
  tableName: SupplierPhoto.SUPPLIER_PHOTO_TABLE_NAME
})

export default class SupplierPhoto extends Model {
  public static SUPPLIER_PHOTO_TABLE_NAME = 'SuppliersPhotos' as string;
  public static SUPPLIER_PHOTO_ID = 'id' as string;
  public static SUPPLIER_PHOTO_ORIGINAL_NAME = 'original_name' as string;
  public static SUPPLIER_PHOTO_FILENAME = 'filename' as string;
  public static SUPPLIER_PHOTO_URL = 'url' as string;
  public static SUPPLIER_ID = 'supplier_id' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: SupplierPhoto.SUPPLIER_PHOTO_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: SupplierPhoto.SUPPLIER_PHOTO_ORIGINAL_NAME
  }) originalName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: SupplierPhoto.SUPPLIER_PHOTO_FILENAME
  }) filename!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return `${env.URL}images/${this.getDataValue('filename')}`;
    }
  }) url!: string;

  @ForeignKey(() => Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  }) supplier_id!: number;

  @BelongsTo(() => Supplier)
    supplier!: Supplier;
}