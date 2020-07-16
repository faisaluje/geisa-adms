import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'

import { Wilayah } from './wilayah.entity'

@Entity('level_wilayah', { schema: 'ref' })
export class LevelWilayah {
  @PrimaryColumn()
  id: number

  @Column()
  level: string

  @OneToMany(
    _type => Wilayah,
    wilayah => wilayah.levelWilayah,
  )
  @JoinColumn()
  wilayahs: Wilayah[]
}
