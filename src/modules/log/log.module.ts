import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { CreatorService, IndexerService } from './services';
import { LogRepository } from './repositories/log.repository';
import { DynamoDBRepository } from '../../shared/repositories/dynamo.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createLogRepositoryFactory } from './factories/create-log-repository.factory';

@Module({
    imports: [ConfigModule],
  controllers: [
    LogController
  ],
  providers: [
    CreatorService,
    IndexerService,
    {
        provide: LogRepository,
        useFactory: (configService: ConfigService) => createLogRepositoryFactory(configService),
        inject: [ConfigService],
    },
  ],
})
export class LogModule {}
