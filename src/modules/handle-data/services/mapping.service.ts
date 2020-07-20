import { MesinInfoDto } from 'src/dtos/mesin-info.dto';
import { MesinLogDto } from 'src/dtos/mesin-log.dto';
import { Mesin } from 'src/entities/mesin.entity';
import { MesinUserDto } from '../../../dtos/mesin-user.dto';

export class MappingService {
  static toUser(item: string[], mesin: Mesin): MesinUserDto {
    return {
      mesin,
      pin: item[0].split('=')[1],
      name: item[1].split('=')[1],
      privilege: item[2].split('=')[1],
      password: item[3].split('=')[1],
      card: item[4].split('=')[1],
      group: item[5].split('=')[1],
    };
  }

  static toLog(item: string[], mesin: Mesin): MesinLogDto {
    return {
      mesin,
      pin: item[0],
      time: new Date(item[1]),
      status: item[2],
      verify: item[3],
      workcode: item[4],
    };
  }

  static toInfo(data: string[]): MesinInfoDto {
    const vendor = data.find((val) => val.search('OEMVendor') >= 0);
    const serialNumber = data.find((val) => val.search('SerialNumber') >= 0);
    const deviceName = data.find((val) => val.search('DeviceName') >= 0);

    return {
      deviceName: deviceName ? deviceName.split('=')[1] : '-',
      serialNumber: serialNumber ? serialNumber.split('=')[1] : '-',
      vendor: vendor ? vendor.split('=')[1] : '-',
    };
  }
}
