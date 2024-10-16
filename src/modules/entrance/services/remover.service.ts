import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class RemoverService {
  constructor(private readonly entranceRepository: EntranceRepository) {}

  public async remove(id: number) {
    try {
      return await this.entranceRepository.softDelete(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
