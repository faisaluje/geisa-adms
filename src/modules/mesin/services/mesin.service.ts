import { BadRequestError } from '../../../modules/errors/bad-request-error';
import { Mesin } from '../../../entities/mesin.entity';
import { socketIo, tedis } from '../../../index';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { LIST_ONLINE } from '../../../constants';
import { NotFoundError } from '../../errors/not-found-error';

export class MesinService {
  static async getMesinExist(sn: string): Promise<Mesin> {
    const mesin = await Mesin.findOne({ sn });
    if (!mesin) throw new BadRequestError(`SN ${sn} belum terdaftar`);

    return mesin;
  }
}
