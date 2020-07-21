import { AdmsServer } from './adms-server';
import { MesinRunnerDto } from './dtos/mesin-runner.dto';

const admsServer = new AdmsServer();
const { app, tedis, socketIo } = admsServer;
const mesinRunner: MesinRunnerDto[] = [];

const start = async () => {
  await admsServer.listen();
};

start();

export { app, tedis, socketIo, mesinRunner };
