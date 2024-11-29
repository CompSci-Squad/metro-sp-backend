import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class IndexerService {
  constructor(private readonly userRepository: UserRepository) {
  }
  public async index() {
    return this.userRepository.findAll({ populate: ['stations'] });
   }
}
