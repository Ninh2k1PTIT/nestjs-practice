import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class SearchProvinceDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  slug?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  nameWithType?: string;

  @IsOptional()
  code?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 10;
}
