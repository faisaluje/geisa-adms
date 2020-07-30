import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ConnectedMesin } from './connected-mesin.entity'
import { MesinUsers } from './mesin-users.entity'

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

  @Column()
  instansiId: string;

  @Column()
  tglRegistrasi: Date;

  @Column()
  issuedBy: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => ConnectedMesin, (connectedMesin) => connectedMesin.mesin)
  connectedMesin: ConnectedMesin;

  @OneToMany(() => MesinUsers, (mesinUsers) => mesinUsers.mesin)
  users: MesinUsers[];
}
