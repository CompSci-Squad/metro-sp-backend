import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DynamoDBRepository } from '../../../shared/repositories/dynamo.repository';
import {
  passengerAttributes,
  passengerKeyAttributes,
  passengerGlobalSecondaryIndexes,
  passengerLocalSecondaryIndexes,
} from '../entities/passenger.attributes';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { PassengerEntity } from '../entities/passenger';
import { DynamoDBItemTransformer } from '../../../shared/utils/dynamodb-item-transformer.util';

export class PassengerRepository extends DynamoDBRepository<
  PassengerEntity,
  { id: string; cpf: string }
> {
  protected readonly logger = new Logger(PassengerRepository.name);
  protected tableName = 'clients';
  protected keyAttributes = passengerKeyAttributes;

  protected secondaryIndexes = passengerLocalSecondaryIndexes;
  protected globalSecondaryIndexes = passengerGlobalSecondaryIndexes;
  protected attributes = passengerAttributes;

  constructor(dbClient: DynamoDBClient, docClient: DynamoDBDocumentClient) {
    super(dbClient, docClient);
    this.ensureTableExists().catch((error) => {
      this.logger.error(`Table initialization failed: ${error.message}`);
      throw new InternalServerErrorException(
        `Table initialization failed: ${error.message}`,
      );
    });
  }

  public async getItemByCpf(cpf: string): Promise<PassengerEntity> {
    const params = {
      TableName: this.tableName,
      IndexName: 'cpf-index',
      KeyConditionExpression: 'cpf = :cpf',
      ExpressionAttributeValues: {
        ':cpf': { S: cpf },
      },
      Limit: 1,
    };

    try {
      const result = await this.sendCommandWithErrorHandling(
        new QueryCommand(params),
        'fetch items',
      );

      const item = result?.Items?.[0];
      return DynamoDBItemTransformer.transform(item) as PassengerEntity
    } catch (error) {
      this.logger.error("Error fetching item by CPF:", error);
      throw error;
    }
  }
}
