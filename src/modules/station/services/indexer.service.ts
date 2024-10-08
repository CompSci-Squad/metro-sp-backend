import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { StationRepository } from "../repositories/station.repository";

@Injectable()
export class IndexerService {
	constructor(private readonly stationRepository: StationRepository) {}

	public async index() {
		try {
			return await this.stationRepository.findAll();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
