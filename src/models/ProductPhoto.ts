import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import env from '../env';
import Product from './Product';

@Table({
  tableName: ProductPhoto.PRODUCT_PHOTO_TABLE_NAME
})

export default class ProductPhoto extends Model {
  public static PRODUCT_PHOTO_TABLE_NAME = 'ProductsPhotos' as string;
  public static PRODUCT_PHOTO_ID = 'id' as string;
  public static PRODUCT_PHOTO_ORIGINAL_NAME = 'original_name' as string;
  public static PRODUCT_PHOTO_FILENAME = 'filename' as string;
  public static PRODUCT_PHOTO_URL = 'url' as string;
  public static PRODUCT_ID = 'product_id' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: ProductPhoto.PRODUCT_PHOTO_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: ProductPhoto.PRODUCT_PHOTO_ORIGINAL_NAME
  }) originalName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: ProductPhoto.PRODUCT_PHOTO_FILENAME
  }) filename!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return `${env.URL}images/${this.getDataValue('filename')}`;
    }
  }) url!: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  }) product_id!: number;

  @BelongsTo(() => Product)
    product!: Product;
}