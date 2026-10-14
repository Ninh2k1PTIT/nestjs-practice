import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export class PaginatedRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 10;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtTo?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtTo?: Date;
}
