import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Administrator } from '../models/Administrator';
dotenv.config();

export default class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      port: this.POSTGRES_PORT,
      host: this.POSTGRES_HOST,
      dialect: 'postgres',
      models: [Administrator]
    });

    this.sequelize.authenticate().then(() => {
      console.log('Database connection has been established successfully');
    }).catch((err) => {
      console.log(err);
    });
  }
}