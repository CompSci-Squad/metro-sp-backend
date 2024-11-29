import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { PassengerEntity } from "../entities/passenger";
import { DynamoBaseFinderService } from "../../../shared/services/dynamodb/dynamo-base-finder.service";
import { PassengerRepository } from "../repositories/passenger.repository";
import { CryptographyUtils } from "../../../shared/utils/cryptography.utils";

@Injectable()
export class FinderService extends DynamoBaseFinderService<
  PassengerEntity,
  { id: string; cpf: string }
> {
	protected readonly logger = new Logger(FinderService.name);
	constructor(
		private readonly passengerRepository: PassengerRepository,
		private readonly cryptographyUtil: CryptographyUtils
	) {
		super(passengerRepository);
	}

	public override async findById(id: string): Promise<PassengerEntity> {
		try {
			const item = await this.passengerRepository.getItemById(id);
			return { ...item, cpf: this.cryptographyUtil.decrypt(item.cpf) };
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}
