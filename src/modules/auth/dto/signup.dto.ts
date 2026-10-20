import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";

export class Signup {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @IsInt()
  provinceId?: number | null;

  @IsOptional()
  @IsInt()
  wardId?: number | null;
}
