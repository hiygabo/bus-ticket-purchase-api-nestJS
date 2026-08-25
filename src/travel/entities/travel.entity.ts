import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bus } from '../../bus/entities/bus.entity';
import { Stop } from '../../stop/entities/stop.entity';
import { TravelDetail } from '../../travel_detail/entities/travel_detail.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity('TRAVEL')
export class Travel {
  @PrimaryGeneratedColumn()
  id_travel: number;

  @Column({ type: 'date' })
  departure_date: Date;

  @Column({ type: 'geometry', spatialFeatureType: 'LineString', srid: 4326 })
  route: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;

  @ManyToOne(() => Bus, (bus) => bus.travel)
  @JoinColumn({ name: 'id_bus' })
  bus: Bus;

  // @Column({ name: 'id_bus' })
  // id_bus: number;

  @ManyToOne(() => Stop, (stop) => stop.travels_as_origin)
  @JoinColumn({ name: 'id_origin_stop' })
  travel_origin: Stop;

  @ManyToOne(() => Stop, (stop) => stop.travels_as_destiny)
  @JoinColumn({ name: 'id_destiny_stop' })
  travel_destiny: Stop;

  @OneToMany(() => TravelDetail, (travelDetail) => travelDetail.travel)
  travelDetails: TravelDetail[];

  @ManyToOne(() => Schedule, (schedule) => schedule.travels)
  @JoinColumn({ name: 'id_schedule' })
  schedule: Schedule;
}
