import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBase64 } from 'class-validator';

export class SearchImageDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  image: string;
}
