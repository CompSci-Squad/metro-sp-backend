import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateStationDto } from "../dto/create-station.dto";
import { StationRepository } from '../repositories/station.repository'

@Injectable()
export class CreatorService {
    constructor(private readonly stationRepository: StationRepository) {}

    public async create(dto: CreateStationDto) {
        try {
            return await this.stationRepository.create(dto)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}