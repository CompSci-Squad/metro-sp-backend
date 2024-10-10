import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class RemoverService {
  constructor(private readonly userRepository: UserRepository) {}

  public async remove(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
