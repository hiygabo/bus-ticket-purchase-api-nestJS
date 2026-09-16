import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { PaymentType } from 'src/payment_type/entities/payment_type.entity';
import { TravelDetail } from 'src/travel_detail/entities/travel_detail.entity';

@Entity('PAYMENTS')
export class Payment {
  @PrimaryGeneratedColumn()
  id_payment: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 20, default: 'completed' })
  status: string; 

  @Column({ type: 'varchar', length: 100, nullable: true })
  transaction_code: string; 

  @CreateDateColumn()
  payment_date: Date;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.payments)
  @JoinColumn({ name: 'id_payment_type' })
  paymentType: Relation<PaymentType>;

  @Column()
  id_payment_type: number;

  @OneToOne(() => TravelDetail, (travelDetail) => travelDetail.payment)
  @JoinColumn({ name: 'id_travel_detail' })
  travelDetail: Relation<TravelDetail>;

  @Column()
  id_travel_detail: number;
}