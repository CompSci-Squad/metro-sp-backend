import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class FinderService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findById(id: number) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
