import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class FinderService extends BaseFinderService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
