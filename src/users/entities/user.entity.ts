import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('USERS')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'CLIENT' })
  role: string;
}
