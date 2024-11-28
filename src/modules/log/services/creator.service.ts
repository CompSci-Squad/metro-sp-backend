import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ulid } from 'ulid';
import dayjs from 'dayjs';
import { LogRepository } from '../repositories/log.repository';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogEntity } from '../entities/log';

@Injectable()
export class CreatorService {
  private readonly logger = new Logger(CreatorService.name);
  constructor(private readonly logRepository: LogRepository) {}

  public async create(data: CreateLogDto): Promise<LogEntity> {
    try {
      return await this.logRepository.createItem(
        new LogEntity(ulid(), data.message, dayjs().toISOString(), data.level),
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create log entry');
    }
  }
}
