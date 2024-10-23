import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTerminalDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
