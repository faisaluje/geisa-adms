import { ConnectedMesinStatus } from '../enums/connected-mesin-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('connected_mesin')
export class ConnectedMesin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sn: string;

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

  constructor(sn: string) {
    super();

    this.sn = sn;
  }
}
