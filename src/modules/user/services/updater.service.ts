import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdaterService {
  constructor(private readonly userRepository: UserRepository) {}

  public async update(id: number, dto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
