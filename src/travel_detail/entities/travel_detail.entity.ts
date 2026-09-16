import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Travel } from '../../travel/entities/travel.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity('TRAVEL_DETAIL')
export class TravelDetail {
  @PrimaryGeneratedColumn()
  id_detail: number;

  @Column({ type: 'integer' })
  ticket_price: number;

  @Column({ type: 'varchar' })
  passenger_full_name: string;

  @Column({ type: 'varchar'})
  passenger_ci: string;

  @ManyToOne(() => Travel, (travel) => travel.travelDetails)
  @JoinColumn({ name: 'id_travel' })
  travel: Relation<Travel>;

  @ManyToOne(() => Seat, (seat) => seat.travelDetails)
  @JoinColumn({ name: 'id_seat' })
  seat: Relation<Seat>;

  @ManyToOne(() => User, (user) => user.travelDetails)
  @JoinColumn({ name: 'id_user'})
  user: Relation<User>;

  @OneToOne(() => Payment, (payment) => payment.travelDetail)
  payment: Relation<Payment>;
}
