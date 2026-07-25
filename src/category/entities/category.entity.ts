import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Bus } from 'src/bus/entities/bus.entity';
@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column({ type: 'varchar', length: 150 })
  category_name: string;

  @OneToMany(() => Bus, (bus) => bus.category)
  buses: Bus[];
}
