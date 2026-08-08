export interface GeoPoint {
  type: 'Point';
  coordinates: number[];
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { Travel } from '../../travel/entities/travel.entity';
@Entity('STOP')
export class Stop {
  @PrimaryGeneratedColumn()
  id_stop: number;

  @Column({ type: 'varchar', length: 150 })
  stop_name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: GeoPoint;

  @Column({ type: 'varchar', length: 150, default: 'ACTIVE' })
  stop_state: string;

  @ManyToOne(() => Place, (place) => place.stops)
  @JoinColumn({ name: 'id_place' })
  place: Place;

  @OneToMany(() => Travel, (travel) => travel.travel_origin)
  travels_as_origin: Travel[];
  @OneToMany(() => Travel, (travel) => travel.travel_destiny)
  travels_as_destiny: Travel[];
}
