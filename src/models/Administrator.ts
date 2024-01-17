import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: Administrator.tableName
})

export default class Administrator extends Model {
  public static ADMIN_TABLE_NAME = 'Administrators' as string;
  public static ADMIN_ID = 'id' as string;
  public static ADMIN_NAME = 'name' as string;
  public static ADMIN_EMAIL = 'email' as string;
  public static ADMIN_PASSWORD = 'password' as string;

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: Administrator.ADMIN_ID
    }) id!: number;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      field: Administrator.ADMIN_NAME
    }) name!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      field: Administrator.ADMIN_EMAIL,
      unique: true
    }) email!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      field: Administrator.ADMIN_PASSWORD
    }) password!: string;
}