import { MesinInfoDto } from '../../../dtos/mesin-info.dto'
import { MesinLogDto } from '../../../dtos/mesin-log.dto'
import { MesinUserDto } from '../../../dtos/mesin-user.dto'
import { Mesin } from '../../../entities/mesin.entity'

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

  static toLog(item: string[], sn: string): MesinLogDto {
    return {
      sn,
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

  static toUserPins(text: string): string[] {
    const rows = text.split('\n');
    const pins: string[] = [];
    rows.forEach((row) => {
      if (row.search('OPLOG 9') >= 0) {
        const cols = row.split('\t');
        pins.push(cols[1]);
      }
    });

    return pins;
  }
}
