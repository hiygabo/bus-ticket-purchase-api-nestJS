import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TravelDetail } from 'src/travel_detail/entities/travel_detail.entity';
import { Place } from 'src/place/entities/place.entity';
@Entity('USERS')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ type: 'varchar'})
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'CLIENT' })
  role: string;
  
  @OneToMany(() => TravelDetail, (travelDetail) => travelDetail.user)
  travelDetails: TravelDetail[];

  @ManyToOne(() => Place, (place) => place.users)
  @JoinColumn({ name: 'id_place'})
  city: Place;
}
