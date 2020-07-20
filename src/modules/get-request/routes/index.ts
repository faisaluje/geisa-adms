import express from 'express';
import { CommandService } from '../../handle-cmd/service/command.service';
import { MesinService } from '../../../modules/mesin/services/mesin.service';
import { RunnerService } from '../../../modules/mesin/services/runner.service';

const router = express.Router();

// let proses = true;
router.get('/iclock/getrequest', async (req, res) => {
  console.log('iclock/getrequest', req.query, new Date().toLocaleString());
  const sn: string = req.query.SN as string;
  // const cmd = `C:123:DATA QUERY USERINFO`;
  // const cmd = `C:123:DATA QUERY ATTLOG`;
  // const cmd = `C:123:INFO`;
  MesinService.updateMesinStatus(req.query.SN as string);
  RunnerService.initRunner(req.query.SN as string);
  const cmd = await CommandService.getCommands(sn);

  res.header('Content-Type', 'text/plain').send(cmd || 'OK');
  // proses = true;
});

export { router as indexGetRequestRouter };
