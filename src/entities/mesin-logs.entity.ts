import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('mesin_logs')
@Index(['time', 'pin', 'sn'], { unique: true })
export class MesinLogs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  sn: string;

  @Column()
  pin: string;

  @Column('timestamp')
  time: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  verify: string;

  @Column({ nullable: true })
  workcode: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
