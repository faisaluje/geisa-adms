import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Instansi } from './instansi.entity';
import { Pengguna } from './pengguna.entity';

@Index(['sn'], { unique: true })
@Entity('mesin')
export class Mesin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sn: string;

  @Column({ nullable: true })
  nama: string;

  @ManyToOne(() => Instansi, (instansi) => instansi.mesins)
  instansi: Instansi;

  @Column()
  tglRegistrasi: Date;

  @ManyToOne(() => Pengguna)
  @JoinColumn({ name: 'issuedBy' })
  issuedBy: Pengguna;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
