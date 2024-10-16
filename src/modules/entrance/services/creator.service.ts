import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEntranceDto } from '../dto/create-entrance.dto';
import { EntranceRepository } from '../repositories/entrance.repository';

@Injectable()
export class CreatorService {
  constructor(private readonly entranceRepository: EntranceRepository) {}

  public async create(dto: CreateEntranceDto) {
    try {
      return await this.entranceRepository.createEntity(dto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
