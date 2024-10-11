import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseRemoverService } from '../../../shared/services/base-remover.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class RemoverService extends BaseRemoverService<UserEntity> {}
