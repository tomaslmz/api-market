import { Sequelize } from 'sequelize-typescript';
import env from '../env';
import Tag from '../models/Tag';
import UserPhoto from '../models/UserPhoto';
import LevelAccess from '../models/LevelAccess';
import User from '../models/User';

export default class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = env.POSTGRES_DB;
  private POSTGRES_HOST = env.POSTGRES_HOST;
  private POSTGRES_PORT = env.POSTGRES_PORT;
  private POSTGRES_USER = env.POSTGRES_USER;
  private POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      port: parseInt(this.POSTGRES_PORT),
      host: this.POSTGRES_HOST,
      dialect: 'postgres',
      models: [Tag, UserPhoto, LevelAccess, User]
    });

    this.sequelize.authenticate().then(() => {
      console.log('Database connection has been established successfully');
    }).catch((err) => {
      console.log(err);
    });
  }

  public async verifyLevelAccess() {
    const levelAccess = await LevelAccess.findAll();

    if(levelAccess.length === 0) {
      await LevelAccess.create({
        id: 1,
        name: 'Owner'
      });

      await LevelAccess.create({
        id: 2,
        name: 'Administrator'
      });

      await LevelAccess.create({
        id: 3,
        name: 'Supplier'
      });

      await LevelAccess.create({
        id: 4,
        name: 'User'
      });
    }
  }
}