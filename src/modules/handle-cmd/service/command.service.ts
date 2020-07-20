import { getRandomString } from '../../../utils';
import { tedis } from '../../../index';

export class CommandService {
  static async getCommands(sn: string): Promise<string> {
    const commands = await tedis.smembers(sn);

    const commandsForMesin = commands.map((cmd) => {
      const id = getRandomString(5);
      return `C:${id}:${cmd.trim()}`;
    });

    return commandsForMesin.join('\n');
  }

  static async deleteCommands(sn: string): Promise<void> {
    const commandsCount = await tedis.scard(sn);

    if (commandsCount > 0) {
      await tedis.spop(sn, commandsCount);
    }
  }
}
