import 'express-async-errors';

import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/error-handler.middleware';
import { indexHandshakeRouter } from './modules/handshake/routes';
import { indexGetRequestRouter } from './modules/get-request/routes';
import { postRequestDataRouter } from './modules/handle-data/routes/post';
import { indexHandleCmdRouter } from './modules/handle-cmd/routes';
import { tedis } from './index';
import { MesinRunnerDto } from './dtos/mesin-runner.dto';

const app = express();
app.use(bodyParser.text());

app.get('/', async (req, res) => {
  const connectedMesins = await tedis.smembers('online');

  res.send(connectedMesins);
});

app.use(indexHandshakeRouter);
app.use(indexGetRequestRouter);
app.use(postRequestDataRouter);
app.use(indexHandleCmdRouter);

app.use(errorHandler);

export const mesinRunner: MesinRunnerDto[] = [];

export default app;
