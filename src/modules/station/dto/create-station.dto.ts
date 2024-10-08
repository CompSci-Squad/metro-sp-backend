import { ApiProperty } from "@nestjs/swagger";
import {
	IsDateString,
	IsLatitude,
	IsLongitude,
	IsNotEmpty,
	IsNumber,
	IsString,
} from "class-validator";

export class CreateStationDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNumber()
	@IsLatitude()
	latitude: number;

	@ApiProperty()
	@IsNumber()
	@IsLongitude()
	longitude: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	address: string;

	@ApiProperty()
    @IsNotEmpty()
    @IsString()
	@IsDateString({ strict: false })
	openingTime: string;

	@ApiProperty()
    @IsNotEmpty()
    @IsString()
	@IsDateString({ strict: false })
	closingTime: string;
}
