import { tedis, socketIo } from '../../..';
import { LIST_ONLINE } from '../../../constants';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { Mesin } from '../../../entities/mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { SocketEvents } from '../../../enums/socket-events.enum';
import { MesinService } from '../../mesin/services/mesin.service';

export class ConnectedMesinService {
  static async getConnectedMesins(): Promise<Mesin[]> {
    const connectedMesins = await Mesin.find({
      relations: ['instansi', 'connectedMesin'],
    });

    return connectedMesins;
  }

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
    socketIo.emit(SocketEvents.STATUS_MESIN, {
      sn,
      status: ConnectedMesinStatus.ONLINE,
    });

    await connectedMesin.save();
  }
}
