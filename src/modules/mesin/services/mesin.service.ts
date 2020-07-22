import { BadRequestError, Mesin } from '@geisa/common'

export class MesinService {
  static async getMesinExist(sn: string): Promise<Mesin> {
    const mesin = await Mesin.findOne({ sn });
    if (!mesin) throw new BadRequestError(`SN ${sn} belum terdaftar`);

    return mesin;
  }
}
