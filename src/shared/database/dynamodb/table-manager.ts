import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  KeySchemaElement,
  LocalSecondaryIndex,
  AttributeDefinition,
  GlobalSecondaryIndex,
} from '@aws-sdk/client-dynamodb';
import { InternalServerErrorException, Logger } from '@nestjs/common';

export abstract class DynamoDBTableManager {
  protected abstract readonly tableName: string;
  protected abstract readonly keyAttributes: KeySchemaElement[];
  protected abstract readonly secondaryIndexes: LocalSecondaryIndex[];
  protected abstract readonly globalSecondaryIndexes?: GlobalSecondaryIndex[];
  protected abstract readonly attributes: AttributeDefinition[];
  protected abstract readonly logger: Logger;
  private static readonly READ_CAPACITY_UNITS = 5;
  private static readonly WRITE_CAPACITY_UNITS = 5;
  protected;

  constructor(private readonly dbClient: DynamoDBClient) {}

  protected async ensureTableExists(): Promise<void> {
    try {
      await this.dbClient.send(
        new DescribeTableCommand({ TableName: this.tableName }),
      );
      this.logger.log(`Table ${this.tableName} already exists.`);
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
        this.logger.warn(
          `Table ${this.tableName} does not exist. Creating now...`,
        );
        await this.createTable();
      } else {
        this.handleError(error, 'check table existence');
      }
    }
  }

  private async createTable(): Promise<void> {
    try {
      await this.dbClient.send(
        new CreateTableCommand({
          TableName: this.tableName,
          KeySchema: this.keyAttributes,
          LocalSecondaryIndexes: this.secondaryIndexes,
          GlobalSecondaryIndexes: this.globalSecondaryIndexes,
          AttributeDefinitions: this.attributes,
          ProvisionedThroughput: {
            ReadCapacityUnits: DynamoDBTableManager.READ_CAPACITY_UNITS,
            WriteCapacityUnits: DynamoDBTableManager.WRITE_CAPACITY_UNITS,
          },
        }),
      );
      this.logger.log(`Table ${this.tableName} created successfully.`);
    } catch (createError) {
      this.handleError(createError, 'create table');
    }
  }

  protected handleError(error: any, action: string): void {
    this.logger.error(`Failed to ${action}: ${error.message}`);
    throw new InternalServerErrorException(
      `Failed to ${action}: ${error.message}`,
    );
  }
}
