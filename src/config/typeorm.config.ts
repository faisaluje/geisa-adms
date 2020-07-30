import { LOGGING_DB, NAME_DB, PASS_DB, PORT_DB, URL_DB, USER_DB } from '../constants'
import { ConnectionOptionsDto } from '../dtos/connection-options.dto'

export const typeOrmConfig: ConnectionOptionsDto = {
  host: process.env.DB_HOST || URL_DB,
  port: parseInt(process.env.DB_PORT || '') || PORT_DB,
  username: process.env.DB_USERNAME || USER_DB,
  password: process.env.DB_PASSWORD || PASS_DB,
  database: process.env.DB_DATABASE || NAME_DB,
  logging: LOGGING_DB,
};
