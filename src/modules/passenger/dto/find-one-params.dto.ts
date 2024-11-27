import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneParamsDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  id: string;
}
