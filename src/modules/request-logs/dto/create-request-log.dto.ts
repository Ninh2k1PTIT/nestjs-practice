import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequestLogDto {
  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsOptional()
  ip?: string | null;

  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsString()
  @IsOptional()
  requestBody?: string | null;

  @IsString()
  @IsOptional()
  response?: string | null;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  statusCode!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  duration!: number;
}
