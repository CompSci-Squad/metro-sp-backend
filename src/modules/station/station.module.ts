import { Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { CreatorService } from './services/creator.service';
import { StationRepository } from './repositories/station.repository';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { StationEntity } from './entities/station.entity';

@Module({
  controllers: [StationController],
  providers: [
    CreatorService,
    IndexerService,
    FinderService,
    UpdaterService,
    RemoverService,
  ],
  exports: [FinderService],
})
export class StationModule {}
