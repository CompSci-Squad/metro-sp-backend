import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { DynamoDBRepository } from "../../../shared/repositories/dynamo.repository"; // Path to your generic repository
import { LogEntity } from "../entities/log";
import { ConfigService } from "@nestjs/config";
import {
	logAttributes,
	logGlobalSecondaryIndexes,
	logKeyAttributes,
} from "../entities/log.attributes";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class LogRepository extends DynamoDBRepository<
	LogEntity,
	{ id: string }
> {
	protected readonly logger = new Logger(LogRepository.name);
	protected tableName = "logs";
	protected keyAttributes = logKeyAttributes;
	protected secondaryIndexes = logGlobalSecondaryIndexes;
	protected attributes = logAttributes;

	constructor(dbClient: DynamoDBClient, docClient: DynamoDBDocumentClient) {
		super(dbClient, docClient);
		this.ensureTableExists().catch((error) => {
			this.logger.error(`Table initialization failed: ${error.message}`);
			throw new InternalServerErrorException(
				`Table initialization failed: ${error.message}`
			);
		});
	}
}
