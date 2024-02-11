import { Column, DataType, Table, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import ProductPhoto from './ProductPhoto';
import Tag from './Tag';

@Table({
  tableName: Product.PRODUCT_TABLE_NAME
})

export default class Product extends Model {
  public static PRODUCT_TABLE_NAME = 'Products' as string;
  public static PRODUCT_ID = 'id' as string;
  public static PRODUCT_NAME = 'name' as string;
  public static PRODUCT_DESCRIPTION = 'description' as string;
  public static PRODUCT_PRICE = 'price' as string;
  public static PRODUCT_DISCOUNT = 'discount' as string;
  public static PRODUCT_TAG_ID = 'tag' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Product.PRODUCT_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: Product.PRODUCT_NAME
  }) name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: Product.PRODUCT_DESCRIPTION
  }) description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: Product.PRODUCT_PRICE,
    defaultValue: 0
  }) price!: number;

  @Column({
    type: DataType.FLOAT,
    field: Product.PRODUCT_DISCOUNT,
    defaultValue: 0
  }) discount!: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  }) tag_id!: number;

  @HasMany(() => ProductPhoto, { foreignKey: 'product_id', as: 'photos' })
    photos?: ProductPhoto[];

  @BelongsTo(() => Tag)
    tag!: Tag;
}