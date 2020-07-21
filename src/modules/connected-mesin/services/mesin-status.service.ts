import { socketIo, tedis } from '../../..';
import { LIST_ONLINE } from '../../../constants';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { Mesin } from '../../../entities/mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { NotFoundError } from '../../errors/not-found-error';

export class MesinStatusService {
  static async setMesinStatus(
    sn: string,
    statusMesin: ConnectedMesinStatus
  ): Promise<void> {
    const mesin = await Mesin.findOne({ sn });
    if (!mesin) throw new NotFoundError();

    await ConnectedMesin.update({ mesin }, { status: statusMesin });
    socketIo.emit('status-mesin', { sn, status: statusMesin });
  }

  static async setMesinOffline(sn: string): Promise<void> {
    await tedis.srem(LIST_ONLINE, sn);
    await this.setMesinStatus(sn, ConnectedMesinStatus.OFLINE);

    console.log(`Mesin ${sn} set to offline`);
  }

  static async setMesinOnline(sn: string): Promise<void> {
    await tedis.sadd(LIST_ONLINE, sn);
    await this.setMesinStatus(sn, ConnectedMesinStatus.ONLINE);

    console.log(`Mesin ${sn} set to online`);
  }

  static async updateMesinStatus(sn: string): Promise<void> {
    const isOnline = await tedis.sismember(LIST_ONLINE, sn);

    if (!isOnline) {
      this.setMesinOnline(sn);
    }
  }

  static async resetMesinStatus(): Promise<void> {
    const mesinLastConnectedCount = await tedis.scard(LIST_ONLINE);

    console.log('Reset all mesin status to offline');

    if (mesinLastConnectedCount > 0) {
      await tedis.spop(LIST_ONLINE, mesinLastConnectedCount);
    }

    await ConnectedMesin.update(
      { status: ConnectedMesinStatus.ONLINE },
      { status: ConnectedMesinStatus.OFLINE }
    );
  }
}
