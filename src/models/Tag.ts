import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product';

@Table({
  tableName: Tag.tableName
})

export default class Tag extends Model {
  public static TAG_TABLE_NAME = 'Tags' as string;
  public static TAG_ID = 'id' as string;
  public static TAG_NAME = 'name' as string;
  public static TAG_COLOR = 'color' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Tag.TAG_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: Tag.TAG_NAME,
  }) name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: Tag.TAG_COLOR,
  }) color!: string;

  @HasMany(() => Product)
    products!: Product[];
}