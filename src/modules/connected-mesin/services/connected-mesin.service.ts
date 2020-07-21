import { Mesin } from '../../../entities/mesin.entity';

export class ConnectedMesinService {
  static async getConnectedMesins(): Promise<Mesin[]> {
    const connectedMesins = await Mesin.find({
      relations: ['instansi', 'connectedMesin'],
    });

    return connectedMesins;
  }
}
