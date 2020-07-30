import { Mesin } from '../entities/mesin.entity'

export interface MesinUserDto {
  mesin: Mesin;
  pin: string;
  name: string;
  privilege?: string;
  password?: string;
  card?: string;
  group?: string;
}
