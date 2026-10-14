import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginatedRequestDto } from 'src/common/dto/paginated-request.dto';

export class SearchWardRequestDto extends PaginatedRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  nameWithType?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  pathWithType?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  parentCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  provinceId?: number;
}
