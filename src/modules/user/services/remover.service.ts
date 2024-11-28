import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseRemoverService } from '../../../shared/services/base-remover.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class RemoverService extends BaseRemoverService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}