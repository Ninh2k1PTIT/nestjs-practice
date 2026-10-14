import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginatedRequestDto } from 'src/common/dto/paginated-request.dto';

export class SearchRequestLogRequestDto extends PaginatedRequestDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  statusCode?: number;
}
