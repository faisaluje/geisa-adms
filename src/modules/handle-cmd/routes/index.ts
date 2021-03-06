import express from 'express'
import getRawBody from 'raw-body'

import { tedis } from '../../..'
import { CMDINFO } from '../../../constants'
import { ProcessDataService } from '../../../modules/handle-data/services/process-data.service'
import { CommandService } from '../service/command.service'

const router = express.Router();

router.post('/iclock/devicecmd', async (req, res) => {
  console.log('iclock/devicecmd', req.query);
  const sn: string = req.query.SN as string;

  if (req.readable) {
    const raw = await getRawBody(req);
    const text = raw.toString().trim();

    let content = text;

    if (content.search('DeviceName=') >= 0) {
      CommandService.deleteCommand(sn, CMDINFO);
      ProcessDataService.updateMesinInfo(content);
    }

    if (content.search('&Return=0&CMD=DATA') >= 0) {
      const id = text.split('&')[0].substr(3);
      if (id !== '123') {
        CommandService.updateStatusCommand(sn, id);
      } else {
        tedis.spop(sn, 1);
      }
    }
  }
  res.header('Content-Type', 'text/plain').send('OK');
});

export { router as indexHandleCmdRouter };
