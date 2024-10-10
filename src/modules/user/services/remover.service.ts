import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class RemoverService {
  constructor(private readonly userRepository: UserRepository) {}

  public async remove(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
