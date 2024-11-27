import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { CreatorService, IndexerService } from './services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogRepositorySingleton } from './factories/create-log-repository.factory';
import { LogRepository } from './repositories/log.repository';

@Module({
  imports: [ConfigModule],
  controllers: [LogController],
  providers: [
    CreatorService,
    IndexerService,
    {
      provide: LogRepository,
      useFactory: (configService: ConfigService) =>
        LogRepositorySingleton.getInstance(configService),
      inject: [ConfigService],
    },
  ],
})
export class LogModule {}
