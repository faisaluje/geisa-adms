import { mesinRunner } from '../../..';
import { TIMEOUT } from '../../../constants';
import { MesinStatusService } from '../../connected-mesin/services/mesin-status.service';

export class RunnerService {
  static initRunner(sn: string): void {
    let runner = mesinRunner.find((mesin) => mesin.sn === sn);
    if (!runner) {
      runner = {
        sn,
      };
      mesinRunner.push(runner);
    } else {
      clearTimeout(runner.timeout!);
    }

    runner.timeout = setTimeout(() => {
      MesinStatusService.setMesinOffline(sn);
    }, TIMEOUT);
  }
}
