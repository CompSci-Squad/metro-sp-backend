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
export class FinderService {
  constructor(private readonly userRepository: UserRepository) {
  }
  public async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneOrFail({email}, { populate: ['stations'] });
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
