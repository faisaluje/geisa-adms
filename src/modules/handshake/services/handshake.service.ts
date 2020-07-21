import { MesinService } from '../../../modules/mesin/services/mesin.service';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { tedis } from '../../../index';
import { LIST_ONLINE } from '../../../constants';

export class HandshakeService {
  static async upsertConnectedMesin(sn: string): Promise<void> {
    const mesin = await MesinService.getMesinExist(sn);

    await tedis.sadd(LIST_ONLINE, sn);
    await tedis.sadd(sn, 'INFO');

    let connectedMesin = await ConnectedMesin.findOne({ mesin });
    if (!connectedMesin) {
      connectedMesin = new ConnectedMesin(mesin);
    }

    connectedMesin.status = ConnectedMesinStatus.ONLINE;

    console.log(`mesin ${sn} set to online`);

    await connectedMesin.save();
  }
}
