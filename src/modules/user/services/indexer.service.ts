import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseIndexerService } from 'src/shared/services/base-indexer.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class IndexerService extends BaseIndexerService<UserEntity> {}
