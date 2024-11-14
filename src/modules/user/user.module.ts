import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreatorService } from './services';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';

@Module({
  controllers: [UserController],
  providers: [
    CreatorService,
    IndexerService,
    FinderService,
    UpdaterService,
    RemoverService,
  ],
  exports: [FinderService],
})
export class UserModule {}
