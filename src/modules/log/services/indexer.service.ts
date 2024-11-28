import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogRepository } from '../repositories/log.repository'; // Import your LogRepository
import { LogEntity } from '../entities/log';

@Injectable()
export class IndexerService {
  constructor(private readonly logRepository: LogRepository) {}

  public async findAll(): Promise<LogEntity[]> {
    return await this.logRepository.getAllItems();
  }
}
