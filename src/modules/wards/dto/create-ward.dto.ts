import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWardDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  nameWithType!: string;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  @IsNotEmpty()
  pathWithType!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  parentCode!: string;

  @IsOptional()
  @IsInt()
  provinceId?: number | null;
}
