import 'express-async-errors';

import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(errorHandler);

export default app;
