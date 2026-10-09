import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  nameWithType!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;
}
