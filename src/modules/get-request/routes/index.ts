import express from 'express';
import { MesinService } from '../../../modules/mesin/services/mesin.service';
import { RunnerService } from '../../../modules/mesin/services/runner.service';

const router = express.Router();

let proses = true;
router.get('/iclock/getrequest', (req, res) => {
  console.log('iclock/getrequest', req.query, new Date().toLocaleString());
  // const cmd = `C:123:DATA QUERY USERINFO`;
  const cmd = `C:123:DATA QUERY ATTLOG`;
  MesinService.updateMesinStatus(req.query.SN as string);
  RunnerService.initRunner(req.query.SN as string);

  res.header('Content-Type', 'text/plain').send(proses ? 'OK' : cmd);
  proses = true;
});

export { router as indexGetRequestRouter };
