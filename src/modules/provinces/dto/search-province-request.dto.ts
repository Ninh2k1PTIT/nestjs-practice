import { IsOptional, IsString } from 'class-validator';
import { PaginatedRequestDto } from 'src/common/dto/paginated-request.dto';

export class SearchProvinceRequestDto extends PaginatedRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  nameWithType?: string;

  @IsOptional()
  @IsString()
  code?: string;
}
