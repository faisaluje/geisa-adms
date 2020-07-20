import { MesinService } from '../../../modules/mesin/services/mesin.service';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { tedis } from '../../../index';
import { LIST_ONLINE } from '../../../constants';

export class HandshakeService {
  static async upsertConnectedMesin(sn: string): Promise<void> {
    await MesinService.checkMesinExist(sn);

    await tedis.sadd(LIST_ONLINE, sn);
    await tedis.sadd(sn, 'INFO');

    let mesin = await ConnectedMesin.findOne({ sn });
    if (!mesin) {
      mesin = new ConnectedMesin(sn);
    }

    mesin.status = ConnectedMesinStatus.ONLINE;

    console.log(`mesin ${sn} set to online`);

    await mesin.save();
  }
}
