import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { CommandStatus } from '../types/command-status.types'

@Entity('command')
export class Command extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  sn: string;

  @Column()
  tableName: string;

  @Column()
  tableId: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: CommandStatus,
    default: CommandStatus.WAITING,
  })
  status: CommandStatus;

  @Column()
  cmd: string;

  @CreateDateColumn({ select: false })
  createdAt?: Date;

  @UpdateDateColumn({ select: false })
  updatedAt?: Date;

  @Column()
  createdBy?: string;
}
