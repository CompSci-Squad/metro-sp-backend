import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DynamoDBRepository } from '../../../shared/repositories/dynamo.repository';
import {
  logAttributes,
  logLocalSecondaryIndexes,
  logKeyAttributes,
  logGlobalSecondaryIndexes,
} from '../entities/log.attributes';
import { DynamoDBClient, GlobalSecondaryIndex, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { LogEntity } from '../entities/log';
import { DynamoDBItemTransformer } from '../../../shared/utils/dynamodb-item-transformer.util'
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

  public override async getAllItems(): Promise<LogEntity[]> {
    const params = {
      TableName: this.tableName,
      ProjectionExpression: '#ts, #m, #lvl',
      ExpressionAttributeNames: {
        '#ts': 'timestamp',
        '#lvl': 'level',
        '#m': 'message',
      },
    };
  
    const result = await this.sendCommandWithErrorHandling(
      new ScanCommand(params),
      'scan for most recent logs',
    );
  
    if (!result.Items || result.Items.length === 0) {
      return [];
    }
  
    const sortedItems = result.Items.sort((a, b) =>
      b.timestamp.S.localeCompare(a.timestamp.S),
    );
  
    const limitedItems = sortedItems.slice(0, 10);
  
    return DynamoDBItemTransformer.transform(limitedItems) as LogEntity[];
  }
}
