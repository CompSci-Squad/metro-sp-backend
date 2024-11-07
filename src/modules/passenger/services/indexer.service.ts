import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { ClientEntity } from "../entities/client";
import { DynamoBaseIndexerService } from "../../../shared/services/dynamodb/dynamo-base-indexer.service";

@Injectable()
export class IndexerService extends DynamoBaseIndexerService<
	ClientEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(IndexerService.name);
}
