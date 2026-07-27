import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Travel } from 'src/travel/entities/travel.entity';
@Entity('BUS')
export class Bus {
  @PrimaryGeneratedColumn()
  id_bus: number;

  @Column({ type: 'varchar', length: 15 })
  bus_plate: string;

  @Column({ type: 'varchar', length: 25, default: 'ACTIVE' })
  bus_state: string;
  @ManyToOne(() => Category, (category) => category.buses)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @OneToMany(() => Seat, (seat) => seat.bus)
  seats: Seat[];
  @OneToMany(() => Travel, (travel) => travel.bus)
  travel: Travel[];
}
