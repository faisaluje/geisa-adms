import { Tedis } from 'tedis';
import { createConnection } from 'typeorm';
import app from './app';
import { typeOrmConfig } from './config/typeorm.config';
import { PORT_APP, PORT_REDIS, URL_REDIS } from './constants';
import { MesinService } from './modules/mesin/services/mesin.service';

let tedis: Tedis;
const start = async () => {
  try {
    await createConnection(typeOrmConfig);
    tedis = new Tedis({
      host: URL_REDIS,
      port: PORT_REDIS,
    });

    tedis.on('connect', async () => {
      await MesinService.resetMesinStatus();

      app.listen(PORT_APP, () => {
        console.log(`Listening on port ${PORT_APP}`);
      });
    });
  } catch (e) {
    console.error(e.message);
    throw new Error('Cannot connect to DB, exiting');
  }
};

start();

export { tedis };
