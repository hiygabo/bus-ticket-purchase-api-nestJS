import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Bus } from '../../bus/entities/bus.entity';
import { TravelDetail } from '../../travel_detail/entities/travel_detail.entity';

@Entity('SEAT')
export class Seat {
  @PrimaryGeneratedColumn()
  id_seat: number;

  @Column({ type: 'integer' })
  seat_number: number;

  @ManyToOne(() => Bus, (bus) => bus.seats)
  @JoinColumn({ name: 'id_bus' })
  bus: Bus;

  @OneToMany(() => TravelDetail, (travelDetail) => travelDetail.seat)
  travelDetails: TravelDetail[];
}
