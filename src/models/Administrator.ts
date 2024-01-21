import { Model, Table, Column, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { hash, compare } from 'bcrypt';

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
      field: Administrator.ADMIN_PASSWORD,
    }) password!: string;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: Administrator): Promise<void> {
      const passwordHash = await hash(instance.password, 8);
      instance.password = passwordHash;
    }

    async comparePassword(password: string): Promise<boolean> {
      return await compare(password, this.password);
    }
}