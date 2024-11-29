import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class UpdaterService {
  private readonly logger = new Logger(UpdaterService.name);
  constructor(private readonly userRepository: UserRepository) {}

  public async update(id: number, dto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }

  public async updateByEmail(email: string, dto: UpdateUserDto) {
    try {
      return await this.userRepository.updateByEmail(email, dto);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
