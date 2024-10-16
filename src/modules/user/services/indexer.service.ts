import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class IndexerService extends BaseIndexerService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
