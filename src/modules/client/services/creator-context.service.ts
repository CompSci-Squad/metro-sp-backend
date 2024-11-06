import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { CreateClientDto } from "../dto/create-client.dto";
import { CreateClientStrategy } from "../interfaces/create-client.interface";
import { ClientEntity } from "../entities/client";
import { JustificationType } from "../enums/justification-type.enum";
import {
	ClientValidatorAgeStrategy,
	ClientValidatorPoliceOfficerStrategy,
	ClientValidatorUnemployedStrategy,
} from "../strategies";
import { ClientRepository } from "../repositories/client.repository";
import { ulid } from "ulid";

@Injectable()
export class ClientCreatorContextService {
	private readonly logger = new Logger(ClientCreatorContextService.name);
	private strategy: CreateClientStrategy;

	constructor(
		private readonly ageStrategy: ClientValidatorAgeStrategy,
		private readonly unemployedStrategy: ClientValidatorUnemployedStrategy,
		private readonly policeOfficerStrategy: ClientValidatorPoliceOfficerStrategy,
		private readonly clientRepository: ClientRepository
	) {}

	private setStrategy(strategy: CreateClientStrategy) {
		this.strategy = strategy;
	}

	public async create(data: CreateClientDto): Promise<ClientEntity> {
		try {
			switch (data.justificationType) {
				case JustificationType.AGE:
					this.setStrategy(this.ageStrategy);
					break;
				case JustificationType.UNEMPLOYED:
					this.setStrategy(this.unemployedStrategy);
					break;
				case JustificationType.POLICEOFFICER:
					this.setStrategy(this.policeOfficerStrategy);
					break;
				default:
					throw new BadRequestException("Invalid justification type");
			}
			if (!(await this.strategy.validate(data.justificationDetails))) {
				throw new BadRequestException("Invalid justification details");
			}
			return await this.clientRepository.createItem(
				new ClientEntity({ ...data, id: ulid() })
			);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}
