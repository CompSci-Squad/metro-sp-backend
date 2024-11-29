import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { StationEntity } from '../entities/station.entity';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';

@Injectable()
export class IndexerService {
  constructor(private readonly stationRepository: StationRepository) {}

  public async index() {
   return this.stationRepository.findAll({ populate: ['users', 'entrances'] });
  }
}
