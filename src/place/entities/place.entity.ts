import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stop } from 'src/stop/entities/stop.entity';
@Entity('PLACE')
export class Place {
  @PrimaryGeneratedColumn()
  id_place: number;

  @Column({ type: 'varchar', length: 150 })
  place_name: string;

  @OneToMany(() => Stop, (stop) => stop.place)
  stops: Stop[];
}
