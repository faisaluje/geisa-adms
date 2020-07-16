import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Instansi } from './instansi.entity';
import { LevelWilayah } from './level-wilayah.entity';
import { Negara } from './negara.entity';

@Index(['nama'])
@Entity('wilayah', { schema: 'ref' })
export class Wilayah {
  @PrimaryColumn('varchar', { length: 8 })
  id: string;

  @Column()
  nama: string;

  @ManyToOne((_type) => LevelWilayah, (levelWilayah) => levelWilayah.wilayahs)
  levelWilayah: LevelWilayah;

  @Column()
  levelWilayahId: number;

  @ManyToOne((_type) => Wilayah, (mstWilayah) => mstWilayah.wilayahs, {
    nullable: true,
  })
  mstWilayah: Wilayah;

  @ManyToOne((_type) => Negara, (negara) => negara.wilayahs)
  negara: Negara;

  @OneToMany((_type) => Wilayah, (wilayah) => wilayah.mstWilayah)
  @JoinColumn()
  wilayahs: Wilayah[];

  @OneToMany((_type) => Instansi, (instansi) => instansi.wilayah)
  @JoinColumn()
  instansis: Instansi[];
}
