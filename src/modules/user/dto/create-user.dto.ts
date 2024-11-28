import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserPermissions } from '../enums/user-permissions.enum';
import { IsCpfValid } from 'src/shared/decorators/cpf-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCpfValid()
  cpf: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(UserPermissions, { each: true })
  permissions: UserPermissions[];

  @ApiProperty()
  @IsNumber()
  stationId: number;
}
