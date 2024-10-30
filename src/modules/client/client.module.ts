import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientRepository } from './repositories/client.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientRepositorySingleton } from './factories/create-client-repository.factory';
import {
  ClientCreatorAgeStrategy,
  ClientCreatorPCDStrategy,
  ClientCreatorPoliceOfficerStrategy,
  ClientCreatorUnemployedStrategy,
} from './strategies';
import { ClientCreatorContextService } from './services';

@Module({
  controllers: [ClientController],
  imports: [ConfigModule],
  providers: [
    {
      provide: ClientRepository,
      useFactory: (configService: ConfigService) =>
        ClientRepositorySingleton.getInstance(configService),
      inject: [ConfigService],
    },
    ClientCreatorAgeStrategy,
    ClientCreatorPCDStrategy,
    ClientCreatorPoliceOfficerStrategy,
    ClientCreatorUnemployedStrategy,
    ClientCreatorContextService,
  ],
})
export class ClientModule {}
