import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindOneParamsDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;
}
