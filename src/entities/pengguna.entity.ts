import { PenggunaStatus } from '../enums/pengguna-status.enum';
import {
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
import { Peran } from './peran.entity';

@Index(['username'], { unique: true })
@Entity('pengguna')
export class Pengguna {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({ nullable: true })
  noHp: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: PenggunaStatus,
    default: PenggunaStatus.AKTIF,
  })
  status: PenggunaStatus;

  @ManyToOne((_type) => Peran, (peran) => peran.penggunas, { eager: true })
  peran: Peran;

  @ManyToOne(() => Instansi, (instansi) => instansi.penggunas)
  instansi: Instansi;

  @ManyToOne(() => Pengguna, { nullable: true })
  @JoinColumn({ name: 'issuedBy' })
  issuedBy: Pengguna;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
