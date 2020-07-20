import { mesinRunner } from '../../../app';
import { TIMEOUT } from '../../../constants';
import { MesinService } from './mesin.service';

export class RunnerService {
  static initRunner(sn: string): void {
    let runner = mesinRunner.find((mesin) => mesin.sn === sn);
    if (!runner) {
      runner = {
        sn,
        timeout: null,
      };
      mesinRunner.push(runner);
    } else {
      clearTimeout(runner.timeout);
    }

    runner.timeout = setTimeout(() => {
      MesinService.setMesinOffline(sn);
    }, TIMEOUT);
  }
}
