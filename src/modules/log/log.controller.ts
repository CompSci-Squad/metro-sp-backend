import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	NotFoundException,
} from "@nestjs/common";
import { CreateLogDto } from "./dto/create-log.dto";
import { CreatorService, IndexerService } from "./services";
import { LogEntity } from "./entities/log";

@Controller("logs")
export class LogController {
	constructor(
		private readonly creatorService: CreatorService,
		private readonly indexerService: IndexerService
	) {}

	@Post()
	async createLog(@Body() logData: CreateLogDto): Promise<LogEntity> {
		return await this.creatorService.create(logData);
	}

	@Get()
	async getAllLogs(): Promise<LogEntity[]> {
		return await this.indexerService.findAll();
	}
}
