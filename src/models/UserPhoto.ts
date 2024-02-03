import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import env from '../env';
import User from './User';

@Table({
  tableName: UserPhoto.USER_PHOTO_TABLE_NAME
})

export default class UserPhoto extends Model {
  public static USER_PHOTO_TABLE_NAME = 'UsersPhotos' as string;
  public static USER_PHOTO_ID = 'id' as string;
  public static USER_PHOTO_ORIGINAL_NAME = 'original_name' as string;
  public static USER_PHOTO_FILENAME = 'filename' as string;
  public static USER_PHOTO_URL = 'url' as string;
  public static USER_ID = 'user_id' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: UserPhoto.USER_PHOTO_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: UserPhoto.USER_PHOTO_ORIGINAL_NAME
  }) originalName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: UserPhoto.USER_PHOTO_FILENAME
  }) filename!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return `${env.URL}images/${this.getDataValue('filename')}`;
    }
  }) url!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  }) user_id!: number;

  @BelongsTo(() => User)
    user!: User;
}