import { Mesin } from '../entities/mesin.entity';

export interface MesinLogDto {
  mesin: Mesin;
  pin: string;
  time: Date;
  status: string;
  verify: string;
  workcode: string;
}
