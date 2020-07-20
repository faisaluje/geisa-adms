import { Request } from 'express';
import rawBody from 'raw-body';
import { Mesin } from '../../../entities/mesin.entity';
import { MesinUserDto } from '../../../dtos/mesin-user.dto';
import { BadRequestError } from '../../../modules/errors/bad-request-error';
import { MappingService } from './mapping.service';
import { MesinLogDto } from '../../../dtos/mesin-log.dto';
import { MesinInfoDto } from 'src/dtos/mesin-info.dto';

export class BodyService {
  static async convertRawToText(req: Request): Promise<string> {
    if (req.readable) {
      const raw = await rawBody(req);
      const text = raw.toString().trim();

      return text;
    }

    throw new BadRequestError('content not readable');
  }

  static async getBodyLength(req: Request): Promise<number> {
    const text = await this.convertRawToText(req);
    const rows = text.split('\n');

    return rows.length;
  }

  static convertTextToMesinUsers(text: string, mesin: Mesin): MesinUserDto[] {
    const rows = text.split('\n');
    const users: MesinUserDto[] = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        const user = MappingService.toUser(cols, mesin);
        const idxExists = users.findIndex((val) => val.pin === user.pin);
        if (idxExists >= 0) {
          users[idxExists] = user;
        } else {
          users.push(user);
        }
      });
    }

    return users;
  }

  static convertTextToMesinLogs(text: string, mesin: Mesin): MesinLogDto[] {
    const rows = text.split('\n');
    const logs = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        logs.push(MappingService.toLog(cols, mesin));
      });
    }

    return logs;
  }

  static convertTextToMesinInfo(text: string): MesinInfoDto {
    const rows = text.split('\n');
    const result = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        result.push(cols[0]);
      });
    }

    return MappingService.toInfo(result);
  }
}
