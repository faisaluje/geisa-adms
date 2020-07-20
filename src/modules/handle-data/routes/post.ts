import express from 'express';
import { BodyService } from '../services/body.service';
import { ProcessDataService } from '../services/process-data.service';

const router = express.Router();

router.post('/iclock/cdata', async (req, res) => {
  console.log('iclock/cdata', req.query);
  await ProcessDataService.processData(req);

  res.header('Content-Type', 'text/plain').send(`OK`);
});

export { router as postRequestDataRouter };
