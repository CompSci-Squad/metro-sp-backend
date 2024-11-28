import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EntranceStatus } from '../enums/entrance-status.enum';

export class CreateEntranceDto {
  @ApiProperty()
  @IsNumber()
  stationId: number;

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
  @IsArray()
  @IsEnum(EntranceStatus, { each: true })
  status: EntranceStatus[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  terminalId?: number;
}
