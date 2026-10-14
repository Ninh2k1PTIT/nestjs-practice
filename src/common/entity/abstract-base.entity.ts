import {
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class AbstractBaseEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
