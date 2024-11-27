import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DynamoDBRepository } from '../../../shared/repositories/dynamo.repository'; // Path to your generic repository
import {
  logAttributes,
  logLocalSecondaryIndexes,
  logKeyAttributes,
  logGlobalSecondaryIndexes,
} from '../entities/log.attributes';
import { DynamoDBClient, GlobalSecondaryIndex } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { LogEntity } from '../entities/log';

export class LogRepository extends DynamoDBRepository<
  LogEntity,
  { id: string }
> {
  protected readonly logger = new Logger(LogRepository.name);
  protected tableName = 'logs';
  protected keyAttributes = logKeyAttributes;
  protected secondaryIndexes = logLocalSecondaryIndexes;
  protected globalSecondaryIndexes = logGlobalSecondaryIndexes;
  protected attributes = logAttributes;

  constructor(dbClient: DynamoDBClient, docClient: DynamoDBDocumentClient) {
    super(dbClient, docClient);
    this.ensureTableExists().catch((error) => {
      this.logger.error(`Table initialization failed: ${error.message}`);
      throw new InternalServerErrorException(
        `Table initialization failed: ${error.message}`,
      );
    });
  }
}
