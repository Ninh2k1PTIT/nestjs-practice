import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { BaseService } from 'src/common/service/base.service';
import { Ward } from './entities/ward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SearchWardRequestDto } from './dto/search-ward-request.dto';

@Injectable()
export class WardsService extends BaseService<
  Ward,
  CreateWardDto,
  UpdateWardDto
> {
  constructor(@InjectRepository(Ward) wardsRepository: Repository<Ward>) {
    super(wardsRepository);
  }

  search(query: SearchWardRequestDto) {
    return this.paging(query, {
      where: {
        name: query.name ? ILike(`%${query.name}%`) : undefined,
        type: query.type ? ILike(`%${query.type}%`) : undefined,
        slug: query.slug ? ILike(`%${query.slug}%`) : undefined,
        nameWithType: query.nameWithType
          ? ILike(`%${query.nameWithType}%`)
          : undefined,
        path: query.path ? ILike(`%${query.path}%`) : undefined,
        pathWithType: query.pathWithType
          ? ILike(`%${query.pathWithType}%`)
          : undefined,
        code: query.code ? ILike(`%${query.code}%`) : undefined,
        parentCode: query.parentCode
          ? ILike(`%${query.parentCode}%`)
          : undefined,
        provinceId: query.provinceId,
      },
    });
  }
}
