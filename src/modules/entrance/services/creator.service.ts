import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEntranceDto } from '../dto/create-entrance.dto';
import { EntranceRepository } from '../repositories/entrance.repository';
import { FinderService as StationFinderService } from '../../station/services/finder.service';

@Injectable()
export class CreatorService {
  constructor(
    private readonly entranceRepository: EntranceRepository,
    private readonly stationFinderService: StationFinderService,
  ) {}

  public async create(dto: CreateEntranceDto) {
    try {
      await this.stationFinderService.findById(dto.stationId);
      return await this.entranceRepository.createEntity(dto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
