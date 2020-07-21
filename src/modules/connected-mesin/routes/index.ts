import { Router } from 'express';
import { ConnectedMesinService } from '../services/connected-mesin.service';

const router = Router();

router.get('/', async (req, res) => {
  const connectedMesins = await ConnectedMesinService.getConnectedMesins();

  res.send(connectedMesins);
});

export { router as indexRouter };
