import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	GetCommand,
	UpdateCommand,
	DeleteCommand,
	QueryCommand,
	UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { ConfigService } from "@nestjs/config";

type KeyType = {
	id: string;
};

export abstract class DynamoDBRepository<T, K extends KeyType> {
	private readonly logger = new Logger(DynamoDBRepository.name);
	protected abstract readonly tableName: string;
	private readonly docClient: DynamoDBDocumentClient;

	constructor(configService: ConfigService) {
		const client = new DynamoDBClient({
			region: configService.get<string>("DYNAMODB_REGION") || "local",
			endpoint:
				configService.get<string>("DYNAMODB_ENDPOINT") ||
				"http://localhost:8000",
		});
		this.docClient = DynamoDBDocumentClient.from(client);
	}

	protected async createItem(item: T): Promise<void> {
		try {
			const params = {
				TableName: this.tableName,
				Item: item,
			};
			await this.docClient.send(new PutCommand(params));
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				"Failed to create item",
				error.message
			);
		}
	}

	protected async getItem(key: K): Promise<T | undefined> {
		try {
			const params = {
				TableName: this.tableName,
				Key: key,
			};
			const result = await this.docClient.send(new GetCommand(params));
			return result.Item as T;
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				"Failed to fetch item",
				error.message
			);
		}
	}

	protected async updateItem(
		key: K,
		updateExpression: string,
		expressionValues: Record<string, any>
	): Promise<void> {
		try {
			const params: UpdateCommandInput = {
				TableName: this.tableName,
				Key: key,
				UpdateExpression: updateExpression,
				ExpressionAttributeValues: expressionValues,
				ReturnValues: "UPDATED_NEW",
			};
			await this.docClient.send(new UpdateCommand(params));
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				"Failed to update item",
				error.message
			);
		}
	}

	protected async deleteItem(key: K): Promise<void> {
		try {
			const params = {
				TableName: this.tableName,
				Key: key,
			};
			await this.docClient.send(new DeleteCommand(params));
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				"Failed to delete item",
				error.message
			);
		}
	}

	protected async queryItems(
		keyConditionExpression: string,
		expressionValues: Record<string, any>
	): Promise<T[]> {
		try {
			const params = {
				TableName: this.tableName,
				KeyConditionExpression: keyConditionExpression,
				ExpressionAttributeValues: expressionValues,
			};
			const result = await this.docClient.send(new QueryCommand(params));
			return result.Items as T[];
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				"Failed to query items",
				error.message
			);
		}
	}
}
