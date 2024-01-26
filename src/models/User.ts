import { compare, hash } from 'bcrypt';
import { DataType, Model, Table, Column, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';

@Table({
  tableName: User.USER_TABLE_NAME
})

export default class User extends Model {
  public static USER_TABLE_NAME = 'Users' as string;
  public static USER_ID = 'id' as string;
  public static USER_NAME = 'name' as string;
  public static USER_EMAIL = 'email' as string;
  public static USER_PASSWORD = 'password' as string;
  public static USER_BALANCE = 'balance' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: User.USER_NAME
  }) name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: User.USER_EMAIL
  }) email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: User.USER_PASSWORD
  }) password!: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
    field: User.USER_BALANCE
  }) balance!: number;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    const passwordHash = await hash(instance.password, 8);
    instance.password = passwordHash;
  }

  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}