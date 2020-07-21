import { Request } from 'express';
import { ATTLOG, OPERLOG } from '../../../constants';
import { MesinUsers } from '../../../entities/mesin-users.entity';
import { Mesin } from '../../../entities/mesin.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import { BodyService } from './body.service';
import { MesinLogs } from '../../../entities/mesin-logs.entity';
import { socketIo } from '../../..';
import { SocketEvents } from '../../../enums/socket-events.enum';

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
        .execute()
        .then(() => {
          socketIo.emit(SocketEvents.LOGS, object);
        });
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
        .execute()
        .then(() => {
          socketIo.emit(SocketEvents.USERS, object);
        });
    }
  }

  static async processDeleteUserPassword(
    text: string,
    sn: string
  ): Promise<void> {
    const content = text.split('\t');
    const pin = content[1];
    if (pin) {
      try {
        const mesin = await Mesin.findOne({ sn });
        MesinUsers.update({ mesin, pin }, { password: '' });
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  static async processDeleteUser(text: string, sn: string): Promise<void> {
    const content = text.split('\t');
    const pin = content[1];
    if (pin) {
      try {
        const mesin = await Mesin.findOne({ sn });
        MesinUsers.delete({ mesin, pin });
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  static async processData(req: Request): Promise<void> {
    const sn = req.query.SN as string;
    const text = await BodyService.convertRawToText(req);

    if (req.query.table === ATTLOG) {
      Mesin.findOne({ sn }).then((mesin) => {
        if (mesin) {
          this.processMesinLogs(text, mesin);
        }
      });
    }

    if (req.query.table === OPERLOG) {
      if (text.search('USER') >= 0) {
        Mesin.findOne({ sn }).then((mesin) => {
          if (mesin) {
            this.prcessMesinUsers(text, mesin);
          }
        });
      }

      if (text.search('OPLOG 11') >= 0) {
        this.processDeleteUserPassword(text, sn);
      }

      if (text.search('OPLOG 9') >= 0) {
        this.processDeleteUser(text, sn);
      }

      console.log(text);
    }
  }

  static async updateMesinInfo(content: string): Promise<void> {
    const mesinInfo = BodyService.convertTextToMesinInfo(content);

    await Mesin.update(
      {
        sn: mesinInfo.serialNumber,
      },
      {
        nama: mesinInfo.deviceName,
        vendor: mesinInfo.vendor,
      }
    );
  }
}
