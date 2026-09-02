import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Travel } from '../../travel/entities/travel.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { User } from 'src/users/entities/user.entity';
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
  travel: Travel;

  @ManyToOne(() => Seat, (seat) => seat.travelDetails)
  @JoinColumn({ name: 'id_seat' })
  seat: Seat;

  @ManyToOne(() => User, (user) => user.travelDetails)
  @JoinColumn({ name: 'id_user'})
  user: User;
}
