import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Place } from 'src/place/entities/place.entity';
import { Travel } from 'src/travel/entities/travel.entity';
@Entity('STOP')
export class Stop {
  @PrimaryGeneratedColumn()
  id_stop: number;

  @Column({ type: 'varchar', length: 150 })
  stop_name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: string;

  @ManyToOne(() => Place, (place) => place.stops)
  @JoinColumn({ name: 'id_place' })
  place: Place;

  @OneToMany(() => Travel, (travel) => travel.travel_origin)
  travels_as_origin: Travel[];
  @OneToMany(() => Travel, (travel) => travel.travel_destiny)
  travels_as_destiny: Travel[];
}
