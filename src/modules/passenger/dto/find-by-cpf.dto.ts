import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByCpfDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
