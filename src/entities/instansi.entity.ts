import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Mesin } from './mesin.entity'

@Index(['no'], { unique: true })
@Entity('instansi')
export class Instansi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  no: string;

  @Column()
  nama: string;

  @Column({ nullable: true })
  alamat: string;

  @Column()
  wilayahId: string;

  @Column()
  jenisInstansiId: number;

  @Column()
  issuedBy: string;

  @OneToMany(() => Mesin, (mesin) => mesin.instansi)
  @JoinColumn()
  mesins: Mesin[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
