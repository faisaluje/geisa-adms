import { Request } from 'express'
import { getConnection, In } from 'typeorm'

import { socketIo } from '../../..'
import { ATTLOG, OPERLOG } from '../../../constants'
import { MesinLogs } from '../../../entities/mesin-logs.entity'
import { MesinUsers } from '../../../entities/mesin-users.entity'
import { Mesin } from '../../../entities/mesin.entity'
import { SocketEvents } from '../../../types/socket-events.types'
import { BodyService } from './body.service'
import { MappingService } from './mapping.service'

export class ProcessDataService {
  static processMesinLogs(text: string, sn: string): void {
    const object = BodyService.convertTextToMesinLogs(text, sn);

    if (object.length > 0) {
      getConnection()
        .createQueryBuilder()
        .insert()
        .into(MesinLogs)
        .values(object)
        .onConflict('("time", "pin","sn") DO NOTHING')
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
    const userPins = MappingService.toUserPins(text);

    if (userPins.length > 0) {
      try {
        const mesin = await Mesin.findOne({ sn });
        MesinUsers.update({ mesin, pin: In(userPins) }, { password: '' });
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  static async processDeleteUser(text: string, sn: string): Promise<void> {
    const userPins = MappingService.toUserPins(text);

    if (userPins.length > 0) {
      try {
        const mesin = await Mesin.findOne({ sn });
        MesinUsers.delete({ mesin, pin: In(userPins) }).then((result) => {
          socketIo.emit(SocketEvents.DELETED_USER, { sn, userPins });
        });
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  static async processDeleteAllUsers(sn: string): Promise<void> {
    try {
      const mesin = await Mesin.findOne({ sn });
      MesinUsers.delete({ mesin }).then(() => {
        socketIo.emit(SocketEvents.DELETED_ALL_USERS, sn);
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  static async processData(req: Request): Promise<void> {
    const sn = req.query.SN as string;
    const text = await BodyService.convertRawToText(req);

    if (req.query.table === ATTLOG) {
      this.processMesinLogs(text, sn);
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

      if (text.search('OPLOG 13') >= 0) {
        this.processDeleteAllUsers(sn);
      }
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
