import { BadRequestError } from '../../../modules/errors/bad-request-error';
import { Mesin } from '../../../entities/mesin.entity';
import { tedis } from '../../../index';
import { ConnectedMesin } from '../../../entities/connected-mesin.entity';
import { ConnectedMesinStatus } from '../../../enums/connected-mesin-status.enum';
import { LIST_ONLINE } from '../../../constants';

export class MesinService {
  static async checkMesinExist(sn: string): Promise<void> {
    const mesin = await Mesin.findOne({ sn });
    if (!mesin) throw new BadRequestError(`SN ${sn} belum terdaftar`);
  }

  static async setMesinOffline(sn: string): Promise<void> {
    await tedis.srem(LIST_ONLINE, sn);

    await ConnectedMesin.update(
      { sn },
      { status: ConnectedMesinStatus.OFLINE }
    );

    console.log(`Mesin ${sn} set to offline`);
  }

  static async setMesinOnline(sn: string): Promise<void> {
    await tedis.sadd(LIST_ONLINE, sn);

    await ConnectedMesin.update(
      { sn },
      { status: ConnectedMesinStatus.ONLINE }
    );

    console.log(`Mesin ${sn} set to online`);
  }

  static async updateMesinStatus(sn: string): Promise<void> {
    const isOnline = await tedis.sismember(LIST_ONLINE, sn);

    if (!isOnline) {
      this.setMesinOnline(sn);
    }
  }
}
