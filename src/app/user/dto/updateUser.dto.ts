import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  interest: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  type: string;
}
