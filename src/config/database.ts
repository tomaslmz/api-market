import { Sequelize } from 'sequelize-typescript';
import Administrator from '../models/Administrator';
import env from '../env';
import Tag from '../models/Tag';
import Supplier from '../models/Supplier';
import SupplierPhoto from '../models/SupplierPhoto';
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
      models: [Administrator, Tag, Supplier, SupplierPhoto, User]
    });

    const isOwnerExists = await Administrator.findOne({
      where: {
        email: env.OWNER_EMAIL
      }
    });
  
    if(!isOwnerExists) {
      await Administrator.create({
        name: env.OWNER_USER,
        email: env.OWNER_EMAIL,
        password: env.OWNER_PASSWORD
      });
    }

    this.sequelize.authenticate().then(() => {
      console.log('Database connection has been established successfully');
    }).catch((err) => {
      console.log(err);
    });
  }
}