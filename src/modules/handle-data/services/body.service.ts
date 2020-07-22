import { BadRequestError, Mesin, MesinInfoDto, MesinLogDto, MesinUserDto } from '@geisa/common'
import { Request } from 'express'
import rawBody from 'raw-body'

import { MappingService } from './mapping.service'

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

  static convertTextToMesinLogs(text: string, sn: string): MesinLogDto[] {
    const rows = text.split('\n');
    const logs: MesinLogDto[] = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        logs.push(MappingService.toLog(cols, sn));
      });
    }

    return logs;
  }

  static convertTextToMesinInfo(text: string): MesinInfoDto {
    const rows = text.split('\n');
    const result: string[] = [];

    if (rows) {
      rows.forEach((row) => {
        const cols = row.split('\t');
        result.push(cols[0]);
      });
    }

    return MappingService.toInfo(result);
  }
}
