import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginatedRequestDto } from '../dto/paginated-request.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

export abstract class BaseService<
  Entity extends ObjectLiteral & { id: string | number },
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends DeepPartial<Entity>,
> {
  constructor(protected readonly repository: Repository<Entity>) {}

  create(createDto: CreateDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<Entity>);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async update(id: string | number, updateDto: UpdateDto) {
    const entity = await this.findOne(id);
    this.repository.merge(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  protected async paging(
    query: PaginatedRequestDto,
    options: FindManyOptions<Entity> = {},
  ) {
    const [items, count] = await this.repository.findAndCount({
      ...options,
      skip: (query.page - 1) * query.size,
      take: query.size,
    });
    return new PaginatedResponseDto(items, count, query);
  }
}
