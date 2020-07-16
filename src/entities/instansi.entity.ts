import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { JenisInstansi } from './jenis-instansi.entity';
import { Mesin } from './mesin.entity';
import { Pengguna } from './pengguna.entity';
import { Wilayah } from './wilayah.entity';

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

  @ManyToOne((_type) => Wilayah, (wilayah) => wilayah.instansis, {
    nullable: true,
  })
  wilayah: Wilayah;

  @ManyToOne(
    (_type) => JenisInstansi,
    (jenisInstansi) => jenisInstansi.instansis
  )
  jenisInstansi: JenisInstansi;

  @ManyToOne(() => Pengguna)
  @JoinColumn({ name: 'issuedBy' })
  issuedBy: Pengguna;

  @OneToMany(() => Mesin, (mesin) => mesin.instansi)
  @JoinColumn()
  mesins: Mesin[];

  @OneToMany(() => Pengguna, (pengguna) => pengguna.instansi)
  @JoinColumn()
  penggunas: Pengguna[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
