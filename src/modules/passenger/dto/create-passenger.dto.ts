import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCpfValid } from '../../../shared/decorators/cpf-validator';
import { JustificationType } from '../enums/justification-type.enum';

export class CreatePassengerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCpfValid()
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  image: string;

  @ApiProperty({ enum: JustificationType })
  @IsEnum(JustificationType)
  justificationType: JustificationType;

  @ApiProperty()
  @IsString()
  justificationDetails: string;
}
