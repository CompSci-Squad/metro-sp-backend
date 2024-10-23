import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { CreateEntranceDto } from "../dto/create-entrance.dto";
import { EntranceRepository } from "../repositories/entrance.repository";
import { FinderService as StationFinderService } from "../../station/services/finder.service";
import { FinderService as TerminalFinderService } from "../../terminal/services/finder.service";
import { TerminalEntity } from "../../terminal/entities/terminal.entity";

@Injectable()
export class CreatorService {
	private readonly logger = new Logger(CreatorService.name);
	constructor(
		private readonly entranceRepository: EntranceRepository,
		private readonly stationFinderService: StationFinderService,
		private readonly terminalFinderService: TerminalFinderService
	) {}

	public async create({ stationId, terminalId, ...rest }: CreateEntranceDto) {
		try {
			const station = await this.stationFinderService.findById(stationId);
			const terminal = terminalId
				? await this.terminalFinderService.findById(terminalId)
				: null;

			return this.entranceRepository.createEntity({
				...rest,
				station,
				terminal,
			});
		} catch (error) {
			this.logger.error("Failed to create entrance entity", {
				error,
				stationId,
				terminalId,
			});
			throw new InternalServerErrorException(
				"Error creating entrance entity",
				error.message
			);
		}
	}
}
