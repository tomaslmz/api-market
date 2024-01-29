import { Sequelize } from 'sequelize-typescript';
import env from './env';

import Administrator from '../models/Administrator';
import Tag from '../models/Tag';
import Supplier from '../models/Supplier';
import SupplierPhoto from '../models/SupplierPhoto';
import User from '../models/User';

const POSTGRES_DB = env.TEST_POSTGRES_DB;
const POSTGRES_HOST = env.POSTGRES_HOST;
const POSTGRES_PORT = env.POSTGRES_PORT;
const POSTGRES_USER = env.POSTGRES_USER;
const POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT),
  host: POSTGRES_HOST,
  dialect: 'postgres',
  models: [Administrator, Tag, Supplier, SupplierPhoto, User],
  logging: false,
});

export default sequelize;