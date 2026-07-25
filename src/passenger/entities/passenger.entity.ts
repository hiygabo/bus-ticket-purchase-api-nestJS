import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TravelDetail } from '../../travel_detail/entities/travel_detail.entity';

@Entity('PASSENGER')
export class Passenger {
  @PrimaryGeneratedColumn()
  id_passenger: number;

  @Column({ type: 'varchar', length: 50 })
  full_name: string;

  @Column({ type: 'integer' })
  ci: number;

  @Column({ type: 'integer' })
  age: number;

  @OneToMany(() => TravelDetail, (travelDetail) => travelDetail.passenger)
  travelDetails: TravelDetail[];
}
