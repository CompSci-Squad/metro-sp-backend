import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { EntranceStatus } from '../enums/entrance-status.enum';

export class UpdateEntranceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(EntranceStatus, { each: true })
  status?: EntranceStatus[];
}
