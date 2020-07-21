import 'express-async-errors';

import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/error-handler.middleware';
import { indexHandshakeRouter } from './modules/handshake/routes';
import { indexGetRequestRouter } from './modules/get-request/routes';
import { postRequestDataRouter } from './modules/handle-data/routes/post';
import { indexHandleCmdRouter } from './modules/handle-cmd/routes';
import { MesinRunnerDto } from './dtos/mesin-runner.dto';
import { indexRouter } from './modules/connected-mesin/routes';

const app = express();
app.use(bodyParser.text());

app.use(indexHandshakeRouter);
app.use(indexGetRequestRouter);
app.use(postRequestDataRouter);
app.use(indexHandleCmdRouter);

app.use(indexRouter);

app.use(errorHandler);

export const mesinRunner: MesinRunnerDto[] = [];

export default app;
