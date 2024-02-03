import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: LevelAccess.LEVEL_ACCESS_TABLE_NAME
})

export default class LevelAccess extends Model {
  public static LEVEL_ACCESS_TABLE_NAME = 'LevelAccess' as string;
  public static LEVEL_ACCESS_ID = 'id' as string;
  public static LEVEL_ACCESS_NAME = 'name' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    field: LevelAccess.LEVEL_ACCESS_ID
  }) id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: LevelAccess.LEVEL_ACCESS_NAME
  }) name!: string;
}