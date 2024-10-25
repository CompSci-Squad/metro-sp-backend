import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LogLevel } from "../enums/log-level.enum";

export class CreateLogDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiPropertyOptional({ enum: LogLevel })
    @IsOptional()
    @IsEnum(LogLevel)
    level?: LogLevel;

    @ApiPropertyOptional()
    @IsOptional()
    metadata?: Record<string, any>;
}