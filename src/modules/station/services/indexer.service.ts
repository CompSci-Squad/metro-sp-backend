import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseIndexerService } from 'src/shared/services/base-indexer.service';
import { StationEntity } from '../entities/station.entity';

@Injectable()
export class IndexerService extends BaseIndexerService<StationEntity> {}
