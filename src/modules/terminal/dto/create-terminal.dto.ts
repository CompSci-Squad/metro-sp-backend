import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTerminalDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNumber()
  entranceId: number;
}
