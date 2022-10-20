import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AdStatus } from '../enum/adStatus.enum';
import { MaterialType } from '../enum/materialType.enum';
import { OperationType } from '../enum/operationType.enum';
import { Coords } from '../schema/coords.entity';
import { DayOfWeek } from '../schema/dayOfWeek.entity';

export class UpdateAdDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(OperationType)
  @IsOptional()
  operation: OperationType; // sale / exchange / donation

  @IsArray()
  @IsOptional()
  availability: DayOfWeek[];

  @IsOptional()
  location: Coords;

  @IsOptional()
  unity: string;

  @IsEnum(AdStatus)
  @IsOptional()
  status: AdStatus;

  @IsEnum(AdStatus)
  @IsOptional()
  materialType: MaterialType;

  @IsNumber()
  @IsOptional()
  amount: number;
}
