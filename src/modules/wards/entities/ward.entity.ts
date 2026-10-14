import { Exclude } from 'class-transformer';
import { AbstractBaseEntity } from 'src/common/entity/abstract-base.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wards')
export class Ward extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  slug!: string;

  @Column()
  nameWithType!: string;

  @Column()
  path!: string;

  @Column()
  pathWithType!: string;

  @Column()
  code!: string;

  @Column()
  parentCode!: string;

  @ManyToOne(() => Province, (province) => province.wards, {
    eager: true,
    nullable: true,
  })
  province?: Province | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  provinceId?: number | null;

  @OneToMany(() => User, (user) => user.ward)
  users?: User[];
}
