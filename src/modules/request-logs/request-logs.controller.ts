import { Controller, Get, Query } from '@nestjs/common';
import { SearchRequestLogRequestDto } from './dto/search-request-log-request.dto';
import { RequestLogsService } from './request-logs.service';
import { SkipLog } from 'src/common/decorators/skip-log.decorator';

@SkipLog()
@Controller('request-logs')
export class RequestLogsController {
  constructor(private readonly requestLogsService: RequestLogsService) {}

  @Get()
  search(@Query() query: SearchRequestLogRequestDto) {
    return this.requestLogsService.search(query);
  }
}
