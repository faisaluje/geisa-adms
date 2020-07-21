import { LIST_ONLINE } from 'src/constants';
import { tedis } from 'src';
import { ConnectedMesin } from 'src/entities/connected-mesin.entity';
import { getRepository } from 'typeorm';
import { Mesin } from 'src/entities/mesin.entity';

export class ConnectedMesinService {
  static async getConnectedMesins(): Promise<Mesin[]> {
    const connectedMesins = await Mesin.find({
      relations: ['instansi', 'connectedMesin'],
    });

    return connectedMesins;
  }
}
