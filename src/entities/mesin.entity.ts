import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ConnectedMesin } from './connected-mesin.entity'
import { Instansi } from './instansi.entity'
import { MesinUsers } from './mesin-users.entity'
import { Pengguna } from './pengguna.entity'

@Index(['sn'], { unique: true })
@Entity('mesin')
export class Mesin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sn: string;

  @Column({ nullable: true })
  nama: string;

  @Column({ nullable: true })
  vendor: string;

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

  @OneToOne(() => ConnectedMesin, (connectedMesin) => connectedMesin.mesin)
  connectedMesin: ConnectedMesin;

  @OneToMany(() => MesinUsers, (mesinUsers) => mesinUsers.mesin)
  users: MesinUsers[];
}
