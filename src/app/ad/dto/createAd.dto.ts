import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MaterialType } from '../enum/materialType.enum';
import { OperationType } from '../enum/operationType.enum';
import { Coords } from '../schema/coords.entity';
import { DayOfWeek } from '../schema/dayOfWeek.entity';

const apiExamples = {
  exmapleCoords: () => {
    const coords = new Coords();
    coords.adress = 'My adress';
    coords.cordinates = [1.02132, -1.232312, 0.123412];
    coords.name = 'Home';
    coords.type = 'Point';
    return coords;
  },
  exampleDaysOfWeek: () => {
    const day1 = new DayOfWeek();
    day1.day = 1;
    day1.initialTime = '10:30';
    day1.finalTime = '16:00';

    const day2 = new DayOfWeek();
    day2.day = 2;
    day2.initialTime = '09:00';
    day2.finalTime = '15:30';
    return [day1, day2];
  },
};

export class createAdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description',
    example: 'This is my ad',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Type of add',
    required: true,
    enum: ['offer', 'order'],
  })
  type: string; // offer / order

  @IsNotEmpty()
  @ApiProperty({
    description: 'Type of operation',
    required: true,
    enum: OperationType,
  })
  @IsEnum(OperationType)
  operation: OperationType; // sale / exchange / donation

  @ApiProperty({
    description: 'List of days available',
    isArray: true,
    required: true,
    example: apiExamples.exampleDaysOfWeek(),
  })
  @IsArray()
  availability: DayOfWeek[];

  @ApiProperty({
    description: 'Location of ad',
    required: true,
    example: apiExamples.exmapleCoords(),
  })
  location: Coords;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Type of material',
    required: true,
    enum: MaterialType,
  })
  @IsEnum(MaterialType)
  materialType: MaterialType;

  @IsNumber()
  @ApiProperty({
    description: 'List of days available',
    example: 0,
    required: true,
  })
  amount: number;

  @IsString()
  @ApiProperty({
    description: 'Unity of measure',
    required: true,
    example: 'kg',
  })
  unity: string;

  @IsString()
  @ApiProperty({
    description: 'Image url',
    example: 'https://images.com/image-example.jpg',
  })
  photo: string;
}
