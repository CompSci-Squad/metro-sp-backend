import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreatorService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.create(dto)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
