import { Sequelize } from 'sequelize-typescript';

import Tag from '../models/Tag';
import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

import env from './env';

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
  models: [UserPhoto, Tag, User],
  logging: false
});

export default sequelize;