import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { UpdateTerminalDto } from '../dto/update-terminal.dto';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class UpdaterService {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  public async update(id: number, dto: UpdateTerminalDto) {
    try {
      return await this.terminalRepository.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
