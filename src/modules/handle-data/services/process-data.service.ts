import { Request } from 'express';
import { ATTLOG, OPERLOG } from '../../../constants';
import { MesinUsers } from '../../../entities/mesin-users.entity';
import { Mesin } from '../../../entities/mesin.entity';
import { getConnection } from 'typeorm';
import { BodyService } from './body.service';
import { MesinLogs } from '../../../entities/mesin-logs.entity';

export class ProcessDataService {
  static processMesinLogs(text: string, mesin: Mesin): void {
    const object = BodyService.convertTextToMesinLogs(text, mesin);

    if (object.length > 0) {
      getConnection()
        .createQueryBuilder()
        .insert()
        .into(MesinLogs)
        .values(object)
        .onConflict('("time", "pin","mesinId") DO NOTHING')
        .execute();
    }
  }

  static prcessMesinUsers(text: string, mesin: Mesin): void {
    const object = BodyService.convertTextToMesinUsers(text, mesin);

    if (object.length > 0) {
      getConnection()
        .createQueryBuilder()
        .insert()
        .into(MesinUsers)
        .values(object)
        .onConflict(
          `("pin","mesinId") DO 
          UPDATE SET 
            "name" = EXCLUDED."name", 
            "privilege" = EXCLUDED."privilege", 
            "password" = EXCLUDED."password", 
            "card" = EXCLUDED."card", 
            "group" = EXCLUDED."group",
            "updatedAt" = EXCLUDED."updatedAt"`
        )
        .execute();
    }
  }

  static async processData(req: Request): Promise<void> {
    const text = await BodyService.convertRawToText(req);

    if (req.query.table === OPERLOG && text.search('USER') >= 0) {
      Mesin.findOne({ sn: req.query.SN as string }).then((mesin) => {
        if (mesin) {
          this.prcessMesinUsers(text, mesin);
        }
      });
    }

    if (req.query.table === ATTLOG) {
      Mesin.findOne({ sn: req.query.SN as string }).then((mesin) => {
        if (mesin) {
          this.processMesinLogs(text, mesin);
        }
      });
    }
  }
}
