import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DynamoDBRepository } from '../../../shared/repositories/dynamo.repository'; // Path to your generic repository
import {
  clientAttributes,
  clientKeyAttributes,
  clientGlobalSecondaryIndexes,
} from '../entities/client.attributes';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ClientEntity } from '../entities/client';

export class ClientRepository extends DynamoDBRepository<
  ClientEntity,
  { id: string; cpf: string }
> {
  protected readonly logger = new Logger(ClientRepository.name);
  protected tableName = 'clients';
  protected keyAttributes = clientKeyAttributes;
  protected secondaryIndexes = clientGlobalSecondaryIndexes;
  protected attributes = clientAttributes;

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
