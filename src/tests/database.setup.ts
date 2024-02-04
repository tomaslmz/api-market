import { Sequelize } from 'sequelize-typescript';
import env from './env';

import Tag from '../models/Tag';
import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

export default class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = env.TEST_POSTGRES_DB;
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
      models: [Tag, UserPhoto, User],
      logging: false
    });

    this.sequelize.authenticate().then(() => {
      console.log('Database connection has been established successfully');
    }).catch((err) => {
      console.log(err);
    });
  }

  public async createTestAdmin() {
    const isOwnerTestExists = await User.findOne({
      where: {
        email: 'test@owner.com'
      }
    });

    if(!isOwnerTestExists) {
      await User.create({
        name: 'test',
        email: 'test@owner.com',
        password: 'test',
        level_access: 1
      });
    }
  }
}