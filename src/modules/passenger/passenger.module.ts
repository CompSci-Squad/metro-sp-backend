import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerRepository } from './repositories/passenger.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassengerRepositorySingleton } from './factories/create-client-repository.factory';
import {
  PassengerValidatorPoliceOfficerStrategy,
  PassengerValidatorUnemployedStrategy,
  PassengerValidatorAgeStrategy,
} from './strategies';
import {
	PassengerCreatorContextService,
	FinderService,
	IndexerService,
	RemoverService,
	UpdaterService,
} from "./services";
import { EncryptionUtil } from "./utils";

@Module({
	controllers: [PassengerController],
	imports: [ConfigModule],
	providers: [
		{
			provide: PassengerRepository,
			useFactory: (configService: ConfigService) =>
				PassengerRepositorySingleton.getInstance(configService),
			inject: [ConfigService],
		},
		PassengerValidatorAgeStrategy,
		PassengerValidatorPoliceOfficerStrategy,
		PassengerValidatorUnemployedStrategy,
		PassengerCreatorContextService,
		FinderService,
		UpdaterService,
		RemoverService,
		IndexerService,
		EncryptionUtil
	],
})
export class PassengerModule {}
