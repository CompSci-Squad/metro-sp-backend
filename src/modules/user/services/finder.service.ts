import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseFinderService } from 'src/shared/services/base-finder.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class FinderService extends BaseFinderService<UserEntity> {}
