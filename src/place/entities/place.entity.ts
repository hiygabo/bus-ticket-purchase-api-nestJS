import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PLACE')
export class Place {
  @PrimaryGeneratedColumn
  id_place: number;

  @Column({ type: 'varchar', length: 150 })
  place_name: string;
}
