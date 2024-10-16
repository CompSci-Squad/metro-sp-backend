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

@Module({
  controllers: [EntranceController],
  providers: [
    CreatorService,
    IndexerService,
    FinderService,
    UpdaterService,
    RemoverService,
  ],
})
export class EntranceModule {}
