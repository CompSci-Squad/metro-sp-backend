import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseRemoverService } from '../../../shared/services/base-remover.service';
import { TerminalEntity } from '../entities/terminal.entity';

@Injectable()
export class RemoverService extends BaseRemoverService<TerminalEntity> {
  constructor(private readonly terminalRepository: TerminalRepository) {
    super(terminalRepository);
  }
}
