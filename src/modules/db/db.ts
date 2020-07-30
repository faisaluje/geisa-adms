import { ConnectionOptions, createConnection } from 'typeorm'

import { SYNC_DB } from '../../constants'
import { ConnectionOptionsDto } from '../../dtos/connection-options.dto'

class Db {
  async createConnection(options: ConnectionOptionsDto): Promise<void> {
    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      synchronize: SYNC_DB,
      entities: [__dirname + '/../../entities/*.entity.{js,ts}'],
      ...options,
    };

    await createConnection(connectionOptions);
  }
}

export const db = new Db();
