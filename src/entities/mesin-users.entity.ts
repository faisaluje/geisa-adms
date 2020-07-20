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

@Entity('mesin_users')
@Index('pin-mesin-idx', ['pin', 'mesinId'], { unique: true })
export class MesinUsers extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Mesin, { nullable: false })
  mesin: Mesin;

  @Column()
  mesinId: string;

  @Column()
  pin: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  privilege: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  card: string;

  @Column({ nullable: true })
  group: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
