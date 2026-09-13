import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
@Entity('PAYMENT_TYPES')
export class PaymentType {
  @PrimaryGeneratedColumn()
  id_payment_type: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: 'QR', 'CARD', 'PAYPAL'

  @Column({ type: 'text', nullable: true })
  description: string; // Ej: 'Pago mediante QR Simple'

  @OneToMany(() => Payment, (payment) => payment.paymentType)
  payments: Payment[];
}