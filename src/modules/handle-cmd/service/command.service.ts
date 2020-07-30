import { getConnection } from 'typeorm'

import { tedis } from '../../..'
import { Command } from '../../../entities/command.entity'
import { CommandStatus } from '../../../types/command-status.types'
import { BadRequestError } from '../../errors/bad-request-error'

export class CommandService {
  static async getCommands(sn: string): Promise<string> {
    const commands = await tedis.smembers(sn);
    return commands.join('\n');
  }

  static async deleteCommand(sn: string, cmd: string): Promise<void> {
    await tedis.srem(sn, cmd);
  }

  static async updateStatusCommand(sn: string, id: string): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    const command = await queryRunner.manager.findOne(Command, { sn, id });
    if (command) {
      await this.deleteCommand(sn, command.cmd);
      command.status = CommandStatus.EXECUTED;

      try {
        await command.save();
        await queryRunner.query(
          `UPDATE ${command.tableName} SET status = 'aktif' WHERE id = '${command.tableId}'`
        );
        await queryRunner.commitTransaction();
        await queryRunner.release();
      } catch (e) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        console.log(e.message);
        throw new BadRequestError(e.message);
      }
    }
  }
}
