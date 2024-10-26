import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { ulid } from 'ulid'
import dayjs from 'dayjs'
import { LogRepository } from "../repositories/log.repository"; // Import your LogRepository
import { LogEntity } from "../entities/log";
import { CreateLogDto } from "../dto/create-log.dto";
import { LogLevel } from "../enums/log-level.enum";

@Injectable()
export class CreatorService {
	private readonly logger = new Logger(CreatorService.name);
	constructor(private readonly logRepository: LogRepository) {}

	public async create(data: CreateLogDto): Promise<void> {
		const log = new LogEntity();
		log.id = ulid();
		log.message = data.message;
		log.timestamp = dayjs().toISOString()
		log.level = data.level || LogLevel.INFO;

		try {
			return await this.logRepository.createItem(log);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException("Failed to create log entry");
		}
	}
}
