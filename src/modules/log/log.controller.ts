import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	NotFoundException,
} from "@nestjs/common";
import { LogEntity } from "./entities/log";
import { CreateLogDto } from "./dto/create-log.dto";
import { CreatorService, IndexerService } from "./services";

@Controller("logs")
export class LogController {
	constructor(
		private readonly creatorService: CreatorService,
		private readonly indexerService: IndexerService
	) {}

	@Post()
	async createLog(@Body() logData: CreateLogDto): Promise<void> {
		return await this.creatorService.create(logData);
	}

	@Get()
	async getAllLogs(): Promise<LogEntity[]> {
		return await this.indexerService.findAll();
	}
}
