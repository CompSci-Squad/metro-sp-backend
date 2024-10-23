import { Module } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { CreatorService } from './services/creator.service';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';
import { TerminalRepository } from './repositories/terminal.repository';

@Module({
  controllers: [TerminalController],
  providers: [
    CreatorService,
    IndexerService,
    FinderService,
    UpdaterService,
    RemoverService,
  ],
})
export class TerminalModule {}
