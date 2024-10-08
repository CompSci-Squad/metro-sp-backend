import { ApiProperty } from "@nestjs/swagger";
import {
	IsArray,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from "class-validator";
import { UserPermissions } from "../enums/user-permissions.enum";

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
	// todo: add cpf validation decorator
	cpf: string;

	@ApiProperty()
	@IsArray()
	@IsEnum(UserPermissions, { each: true })
	permissions: UserPermissions[];
}
