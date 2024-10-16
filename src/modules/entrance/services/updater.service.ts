import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { UpdateEntranceDto } from '../dto/update-entrance.dto';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class UpdaterService {
  constructor(private readonly entranceRepository: EntranceRepository) {}

  public async update(id: number, dto: UpdateEntranceDto) {
    try {
      return await this.entranceRepository.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
