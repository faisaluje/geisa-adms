import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'

import { Wilayah } from './wilayah.entity'

@Entity('negara', { schema: 'ref' })
export class Negara {
  @PrimaryColumn('char', { length: 2 })
  id: string

  @Column()
  nama: string

  @Column()
  luarNegeri: boolean

  @OneToMany(
    _type => Wilayah,
    wilayah => wilayah.negara,
  )
  @JoinColumn()
  wilayahs: Wilayah[]
}
