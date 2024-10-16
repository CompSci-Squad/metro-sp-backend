import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EntranceStatus } from '../enums/entrance-status.enum';

export class CreateEntranceDto {
  @ApiProperty()
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(EntranceStatus, { each: true })
  status: EntranceStatus[];

  @ApiProperty()
  @IsNumber()
  stationId: number;
}
