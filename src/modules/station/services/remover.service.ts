import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { StationRepository } from "../repositories/station.repository";

@Injectable()
export class RemoverService {
	constructor(private readonly stationRepository: StationRepository) {}

	public async remove(id: number) {
		try {
			return await this.stationRepository.softDelete(id);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
