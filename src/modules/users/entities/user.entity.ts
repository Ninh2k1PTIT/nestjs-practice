import { Exclude } from 'class-transformer';
import { AbstractBaseEntity } from 'src/common/entity/abstract-base.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Province, (province) => province.users, {
    eager: true,
    nullable: true,
  })
  province?: Province | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  provinceId?: number | null;

  @ManyToOne(() => Ward, (ward) => ward.users, {
    eager: true,
    nullable: true,
  })
  ward?: Ward | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  wardId?: number | null;
}
