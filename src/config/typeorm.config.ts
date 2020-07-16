import { ConnectionOptions } from 'typeorm';
import {
  LOGGING_DB,
  NAME_DB,
  PASS_DB,
  PORT_DB,
  SYNC_DB,
  URL_DB,
  USER_DB,
} from '../constants';

export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || URL_DB,
  port: parseInt(process.env.DB_PORT || '') || PORT_DB,
  username: process.env.DB_USERNAME || USER_DB,
  password: process.env.DB_PASSWORD || PASS_DB,
  database: process.env.DB_DATABASE || NAME_DB,
  synchronize: SYNC_DB,
  logging: LOGGING_DB,
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
};
