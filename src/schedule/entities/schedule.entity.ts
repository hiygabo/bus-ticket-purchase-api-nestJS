import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Travel } from 'src/travel/entities/travel.entity';

@Entity('SCHEDULE')
export class Schedule {
  @PrimaryGeneratedColumn()
  id_schedule: number;

  @Column({ type: 'time' })
  departure_time: string;

  @Column({ type: 'time', nullable: true })
  estimated_arrival_time: string;

  @OneToMany(() => Travel, (travel) => travel.schedule)
  travels: Travel[];
}
