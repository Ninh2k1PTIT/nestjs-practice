import { Injectable } from '@nestjs/common';
import { CreateRequestLogDto } from './dto/create-request-log.dto';
import { UpdateRequestLogDto } from './dto/update-request-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestLog } from './entities/request-log.entity';
import { ILike, Repository } from 'typeorm';
import { BaseService } from 'src/common/service/base.service';
import { SearchRequestLogRequestDto } from './dto/search-request-log-request.dto';

@Injectable()
export class RequestLogsService extends BaseService<
  RequestLog,
  CreateRequestLogDto,
  UpdateRequestLogDto
> {
  constructor(
    @InjectRepository(RequestLog) requestLogsRepository: Repository<RequestLog>,
  ) {
    super(requestLogsRepository);
  }

  search(query: SearchRequestLogRequestDto) {
    return this.paging(query, {
      where: {
        ip: query.ip ? ILike(`%${query.ip}%`) : undefined,
        url: query.url ? ILike(`%${query.url}%`) : undefined,
        method: query.method,
        statusCode: query.statusCode,
      },
    });
  }
}
