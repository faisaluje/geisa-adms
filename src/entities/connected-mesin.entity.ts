import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ConnectedMesinStatus } from '../types/connected-mesin-status.types'
import { Mesin } from './mesin.entity'

@Entity('connected_mesin')
export class ConnectedMesin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Mesin, (mesin) => mesin.connectedMesin)
  @JoinColumn()
  mesin: Mesin;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ConnectedMesinStatus,
    default: ConnectedMesinStatus.ONLINE,
  })
  status: ConnectedMesinStatus;

  @CreateDateColumn()
  firstConnectAt?: Date;

  @UpdateDateColumn()
  updatedStatusAt?: Date;

  constructor(mesin: Mesin) {
    super();

    this.mesin = mesin;
  }
}
