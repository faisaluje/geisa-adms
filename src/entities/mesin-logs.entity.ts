import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mesin } from './mesin.entity';

@Entity('mesin_logs')
@Index(['time', 'pin', 'mesinId'], { unique: true })
export class MesinLogs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Mesin)
  mesin: Mesin;

  @Column()
  mesinId: string;

  @Column()
  pin: string;

  @Column('timestamp with time zone')
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
