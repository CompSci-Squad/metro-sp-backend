import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { StationEntity } from '../entities/station.entity';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';

@Injectable()
export class IndexerService extends BaseIndexerService<StationEntity> {
  constructor(private readonly stationRepository: StationRepository) {
    super(stationRepository);
    console.log(this.stationRepository)
  }
}
