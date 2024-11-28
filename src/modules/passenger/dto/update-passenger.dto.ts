import { ApiProperty } from "@nestjs/swagger";
import {
	IsBase64,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { IsCpfValid } from "../../../shared/decorators/cpf-validator";
import { JustificationType } from "../enums/justification-type.enum";

export class UpdatePassengerDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsCpfValid()
	cpf: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsBase64()
	image: string;

	@ApiProperty({ enum: JustificationType })
	@IsOptional()
	@IsEnum(JustificationType)
	justificationType: JustificationType;

	@ApiProperty()
	@IsOptional()
	@IsString()
	justificationDetails: string;
}
