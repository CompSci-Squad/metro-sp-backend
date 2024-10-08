import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { StationRepository } from "../repositories/station.repository";
import { UpdateStationDto } from "../dto/update-station.dto";

@Injectable()
export class UpdaterService {
	constructor(private readonly stationRepository: StationRepository) {}

	public async update(id: number, dto: UpdateStationDto) {
		try {
			return await this.stationRepository.update(id, dto);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
