import express from 'express';

const router = express.Router();

router.post('/iclock/devicecmd', async (req, res) => {
  console.log('iclock/devicecmd', req.query);

  // if (req.readable) {
  //   const raw = await rawBody(req);
  //   const text = raw.toString().trim();

  //   let content = text;
  //   if (content.search('DeviceName=') >= 0) {
  //     content = getDeviceInfo(plainToObj(text, toInfo));
  //   }

  //   console.log(content);
  // }

  res.header('Content-Type', 'text/plain').send('OK');
});

export { router as indexHandleCmdRouter };
