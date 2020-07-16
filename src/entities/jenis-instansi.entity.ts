import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { Instansi } from './instansi.entity';

@Entity('jenis_instansi', { schema: 'ref' })
export class JenisInstansi {
  @PrimaryColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ nullable: true })
  keterangan: string;

  @OneToMany(() => Instansi, (instansi) => instansi.jenisInstansi)
  @JoinColumn()
  instansis?: Instansi[];
}
