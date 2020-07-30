import { Mesin } from '../../../entities/mesin.entity'
import { BadRequestError } from '../../errors/bad-request-error'

export class MesinService {
  static async getMesinExist(sn: string): Promise<Mesin> {
    const mesin = await Mesin.findOne({ sn });
    if (!mesin) throw new BadRequestError(`SN ${sn} belum terdaftar`);

    return mesin;
  }
}
