import { Tedis } from 'tedis';
import { createConnection } from 'typeorm';
import app from './app';
import { typeOrmConfig } from './config/typeorm.config';
import { PORT_APP } from './constants';

let tedis: Tedis;
const start = async () => {
  try {
    await createConnection(typeOrmConfig);
    tedis = new Tedis({
      host: '127.0.0.1',
      port: 6379,
    });

    tedis.on('connect', async () => {
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
