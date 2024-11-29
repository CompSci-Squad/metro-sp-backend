import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { EntranceEntity } from '../entities/entrance.entity';

@Injectable()
export class IndexerService {
  constructor(private readonly entranceRepository: EntranceRepository) {
  }
  public async index() {
    return this.entranceRepository.findAll({ populate: ['station', 'terminal'] });
   }
}
