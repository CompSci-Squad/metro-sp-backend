import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsArray,
  IsEnum,
} from 'class-validator';
import { UserPermissions } from '../enums/user-permissions.enum';
import { IsCpfValid } from 'src/shared/decorators/cpf-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsCpfValid()
  cpf?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(UserPermissions, { each: true })
  permissions?: UserPermissions[];
}
