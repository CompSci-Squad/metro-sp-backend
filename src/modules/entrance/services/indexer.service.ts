import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { EntranceEntity } from '../entities/entrance.entity';

@Injectable()
export class IndexerService extends BaseIndexerService<EntranceEntity> {
  constructor(private readonly entranceRepository: EntranceRepository) {
    super(entranceRepository);
  }
}
