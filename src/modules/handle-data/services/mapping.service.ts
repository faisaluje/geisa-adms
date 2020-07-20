import { MesinLogDto } from 'src/dtos/mesin-log.dto';
import { Mesin } from 'src/entities/mesin.entity';
import { MesinUserDto } from '../../../dtos/mesin-user.dto';

export class MappingService {
  static toObject<T>(
    plainText: string,
    mesin: Mesin,
    dest: (cols: string[]) => T
  ): T[] {
    const rows = plainText.split('\n');
    const result: T[] = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        result.push(dest(cols));
      });
    }

    return result;
  }

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
}
