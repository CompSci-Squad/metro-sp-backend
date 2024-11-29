import { Module } from '@nestjs/common';
import { EntranceController } from './entrance.controller';
import { CreatorService } from './services/creator.service';
import { EntranceRepository } from './repositories/entrance.repository';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { EntranceEntity } from './entities/entrance.entity';
import { StationModule } from '../station/station.module';
import { TerminalModule } from '../terminal/terminal.module';

@Module({
  imports: [StationModule, TerminalModule],
  controllers: [EntranceController],
  providers: [
    CreatorService,
    IndexerService,
    FinderService,
    UpdaterService,
    RemoverService,
  ],
  exports: [FinderService],
})
export class EntranceModule {}
