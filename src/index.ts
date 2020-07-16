import { createConnection, getConnection } from 'typeorm';
import app from './app';
import { typeOrmConfig } from './config/typeorm.config';
import { JWT_KEY, PORT_APP } from './constants';

const start = async () => {
  if (!process.env.JWT_KEY && !JWT_KEY) {
    throw new Error('JWT_KEY undefined');
  }

  try {
    await createConnection(typeOrmConfig);
  } catch (e) {
    console.error(e.message);
    throw new Error('Cannot connect to DB, exiting');
  }

  app.listen(PORT_APP, () => {
    console.log(`Listening on port ${PORT_APP}`);
  });
};

start();
