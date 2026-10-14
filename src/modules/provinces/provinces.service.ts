import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { ILike, Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { SearchProvinceRequestDto } from './dto/search-province-request.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvincesService extends BaseService<
  Province,
  CreateProvinceDto,
  UpdateProvinceDto
> {
  constructor(
    @InjectRepository(Province)
    provincesRepository: Repository<Province>,
  ) {
    super(provincesRepository);
  }

  async search(query: SearchProvinceRequestDto) {
    return this.paging(query, {
      where: {
        name: query.name ? ILike(`%${query.name}%`) : undefined,
        slug: query.slug ? ILike(`%${query.slug}%`) : undefined,
        nameWithType: query.nameWithType
          ? ILike(`%${query.nameWithType}%`)
          : undefined,
        type: query.type,
        code: query.code,
      },
    });
  }
}
