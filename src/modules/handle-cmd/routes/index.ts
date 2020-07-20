import express from 'express';
import getRawBody from 'raw-body';
import { ProcessDataService } from '../../../modules/handle-data/services/process-data.service';
import { CommandService } from '../service/command.service';

const router = express.Router();

router.post('/iclock/devicecmd', async (req, res) => {
  console.log('iclock/devicecmd', req.query);
  const sn: string = req.query.SN as string;

  CommandService.deleteCommands(sn);

  if (req.readable) {
    const raw = await getRawBody(req);
    const text = raw.toString().trim();

    let content = text;
    if (content.search('DeviceName=') >= 0) {
      ProcessDataService.updateMesinInfo(content);
    }
  }

  res.header('Content-Type', 'text/plain').send('OK');
});

export { router as indexHandleCmdRouter };
