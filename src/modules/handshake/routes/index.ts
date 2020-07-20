import express from 'express';
import { RunnerService } from '../../../modules/mesin/services/runner.service';
import { BadRequestError } from '../../errors/bad-request-error';
import { HandshakeService } from '../services/handshake.service';

const router = express.Router();

const resHandshake = (SN: string) => `GET OPTION FROM: ${SN}
Stamp=9999
OpStamp=9999
ErrorDelay=30
Delay=10
TransTimes=00:00
Transinterval=1
TransFlag=TransData AttLog OpLog EnrollUser ChgUser
TimeZone=7
Realtime=1
Encrypt=None`;

router.get('/iclock/cdata', async (req, res) => {
  const { SN } = req.query;
  console.log(req.query);

  try {
    await HandshakeService.upsertConnectedMesin(SN as string);
    RunnerService.initRunner(SN as string);

    res.header('Content-Type', 'text/plain').send(resHandshake(SN as string));
  } catch (e) {
    console.info(e.message);
    throw new BadRequestError('Gagal menyimpan status mesin');
  }

  // res.header('Content-Type', 'text/plain').send('OK');
});

export { router as indexHandshakeRouter };
