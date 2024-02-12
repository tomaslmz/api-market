import { Sequelize } from 'sequelize-typescript';

import env from '../env';
import Tag from '../models/Tag';
import UserPhoto from '../models/UserPhoto';
import User from '../models/User';
import Product from '../models/Product';
import ProductPhoto from '../models/ProductPhoto';

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
      models: [Tag, UserPhoto, User, Product, ProductPhoto],
      logging: false
    });

    this.sequelize.authenticate().then(() => {
      console.log('Database connection has been established successfully');
    }).catch((err) => {
      console.log(err);
    });
  }

  public async createOwner() {
    const isOwnerExists = await User.findOne({
      where: {
        email: env.OWNER_EMAIL
      }
    });

    if(!isOwnerExists) {
      await User.create({
        name: 'owner',
        email: env.OWNER_EMAIL,
        password: env.OWNER_PASSWORD,
        level_access: 1
      });
    }
  }
}