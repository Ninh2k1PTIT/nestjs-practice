import { AbstractBaseEntity } from 'src/common/entity/abstract-base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('provinces')
export class Province extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @Column()
  type!: string;

  @Column()
  nameWithType!: string;

  @Column()
  code!: string;

  @OneToMany(() => User, (user) => user.province)
  users?: User[];

  @OneToMany(() => Ward, (ward) => ward.province)
  wards?: Ward[];
}
