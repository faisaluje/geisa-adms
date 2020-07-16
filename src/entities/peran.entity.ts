import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Pengguna } from './pengguna.entity';

@Entity('peran', { schema: 'ref' })
export class Peran {
  @PrimaryColumn()
  id: number;

  @Column()
  nama: string;

  @OneToMany((_type) => Pengguna, (pengguna) => pengguna.peran)
  @JoinColumn()
  penggunas: Pengguna[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
