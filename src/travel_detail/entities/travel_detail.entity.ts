import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Travel } from '../../travel/entities/travel.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { Passenger } from '../../passenger/entities/passenger.entity';

@Entity('TRAVEL_DETAIL')
export class TravelDetail {
  @PrimaryGeneratedColumn()
  id_detail: number;

  @Column({ type: 'integer' })
  ticket_price: number;

  @ManyToOne(() => Travel, (travel) => travel.travelDetails)
  @JoinColumn({ name: 'id_travel' })
  travel: Travel;

  @ManyToOne(() => Seat, (seat) => seat.travelDetails)
  @JoinColumn({ name: 'id_seat' })
  seat: Seat;

  @ManyToOne(() => Passenger, (passenger) => passenger.travelDetails)
  @JoinColumn({ name: 'id_passenger' })
  passenger: Passenger;
}
