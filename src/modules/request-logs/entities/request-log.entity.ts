import { AbstractBaseEntity } from 'src/common/entity/abstract-base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request-logs')
export class RequestLog extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column({ type: 'text', nullable: true })
  ip?: string | null;

  @Column()
  method!: string;

  @Column({ type: 'text', nullable: true })
  requestBody?: string | null;

  @Column({ type: 'text', nullable: true })
  response?: string | null;

  @Column()
  statusCode!: number;

  @Column({ type: 'double precision' })
  duration!: number;
}
