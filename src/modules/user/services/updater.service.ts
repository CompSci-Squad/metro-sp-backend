import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BaseUpdaterService } from 'src/shared/services/base-updater.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UpdaterService extends BaseUpdaterService<UserEntity, UpdateUserDto> {}
