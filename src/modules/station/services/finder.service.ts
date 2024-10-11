import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { StationEntity } from '../entities/station.entity';

@Injectable()
export class FinderService extends BaseFinderService<StationEntity> {}
