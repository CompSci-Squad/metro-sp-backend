import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { PassengerEntity } from "../entities/passenger";
import { DynamoBaseIndexerService } from "../../../shared/services/dynamodb/dynamo-base-indexer.service";

@Injectable()
export class IndexerService extends DynamoBaseIndexerService<
	PassengerEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(IndexerService.name);
}
