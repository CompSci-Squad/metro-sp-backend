import { Injectable } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { StationEntity } from '../entities/station.entity';

@Injectable()
export class FinderService extends BaseFinderService<StationEntity> {
  constructor(private readonly stationRepository: StationRepository) {
    super(stationRepository);
  }
}
