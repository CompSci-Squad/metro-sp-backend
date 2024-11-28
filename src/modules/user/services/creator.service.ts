import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FinderService as StationFinderService } from '../../station/services/finder.service';
import { userInfo } from 'os';

@Injectable()
export class CreatorService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly stationFinderService: StationFinderService,
  ) {}

  public async create({
    stationId,
    ...rest
  }: CreateUserDto): Promise<UserEntity> {
    try {
      const station = await this.stationFinderService.findById(stationId);
      const user = await this.userRepository.createEntity(rest);
      await this.userRepository.addUserToStation(station, user.id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
