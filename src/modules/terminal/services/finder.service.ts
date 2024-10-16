import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class FinderService {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  public async findById(id: number) {
    try {
      return await this.terminalRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
