import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { LogRepository } from '../repositories/log.repository';

export class LogRepositorySingleton {
  private static instance: LogRepository;

  private constructor() {}

  public static getInstance(configService: ConfigService): LogRepository {
    if (!this.instance) {
      this.instance = this.createLogRepositoryFactory(configService);
    }
    return this.instance;
  }

  private static createLogRepositoryFactory(
    configService: ConfigService,
  ): LogRepository {
    const dbClient = new DynamoDBClient({
      region: configService.get('AWS_REGION') ?? 'us-east-1',
      endpoint: configService.get('AWS_ENDPOINT') ?? 'http://localhost:4566',
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY') ?? 'test',
        secretAccessKey: configService.get('AWS_SECRET_KEY') ?? 'test',
      },
    });

    const docClient = DynamoDBDocumentClient.from(dbClient);
    return new LogRepository(dbClient, docClient);
  }
}
