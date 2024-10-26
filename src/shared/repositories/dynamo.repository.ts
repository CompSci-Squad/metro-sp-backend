import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import {
	AttributeDefinition,
	CreateTableCommand,
	DescribeTableCommand,
	DynamoDBClient,
	KeySchemaElement,
	LocalSecondaryIndex,
	ScanCommand,
} from "@aws-sdk/client-dynamodb";
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
import { DynamoDBTableManager } from "../database/dynamodb/table-manager";

type KeyType = {
	id: string;
};

type DynamoDBItem = Record<string, { S: string }>;

export abstract class DynamoDBRepository<
	T,
	K extends KeyType,
> extends DynamoDBTableManager {
	protected readonly docClient: DynamoDBDocumentClient;

	constructor(dbClient: DynamoDBClient, docClient: DynamoDBDocumentClient) {
		super(dbClient);
		this.docClient = docClient;
	}

	public async createItem(item: T): Promise<void> {
		const params = {
			TableName: this.tableName,
			Item: item,
		};

		await this.sendCommandWithErrorHandling(
			new PutCommand(params),
			"create item"
		);
	}

	public async getItem(key: K): Promise<T | undefined> {
		const params = {
			TableName: this.tableName,
			Key: key,
		};

		const result = await this.sendCommandWithErrorHandling(
			new GetCommand(params),
			"fetch item"
		);
		return result?.Item as T;
	}

	public async updateItem(
		key: K,
		updateExpression: string,
		expressionValues: Record<string, any>
	): Promise<void> {
		const params: UpdateCommandInput = {
			TableName: this.tableName,
			Key: key,
			UpdateExpression: updateExpression,
			ExpressionAttributeValues: expressionValues,
			ReturnValues: "UPDATED_NEW",
		};

		await this.sendCommandWithErrorHandling(
			new UpdateCommand(params),
			"update item"
		);
	}

	public async deleteItem(key: K): Promise<void> {
		const params = {
			TableName: this.tableName,
			Key: key,
		};

		await this.sendCommandWithErrorHandling(
			new DeleteCommand(params),
			"delete item"
		);
	}

	public async queryItems(
		keyConditionExpression?: string,
		expressionValues?: Record<string, any>
	): Promise<T[]> {
		const params = {
			TableName: this.tableName,
			KeyConditionExpression: keyConditionExpression,
			ExpressionAttributeValues: expressionValues,
		};

		const result = await this.sendCommandWithErrorHandling(
			new QueryCommand(params),
			"query items"
		);
		return result.Items as T[];
	}

	public async getAllItems(): Promise<T[]> {
		const params = {
			TableName: this.tableName,
		};

		const result = await this.sendCommandWithErrorHandling(
			new ScanCommand(params),
			"scan items"
		);
		return DynamoDBRepository.transform(result.Items) as T[];
	}

	private async sendCommandWithErrorHandling(
		command: any,
		action: string
	): Promise<any> {
		try {
			return await this.docClient.send(command);
		} catch (error) {
			this.handleError(error, action);
		}
	}

	private static transform(item: DynamoDBItem): Record<string, any>;
	private static transform(items: DynamoDBItem[]): Record<string, any>[];
	private static transform(
		itemOrItems: DynamoDBItem | DynamoDBItem[]
	): Record<string, any> | Record<string, any>[] {
		if (Array.isArray(itemOrItems)) {
			return itemOrItems.map((item) => this.transformSingleItem(item));
		}
		return this.transformSingleItem(itemOrItems);
	}

	private static transformSingleItem(item: DynamoDBItem): Record<string, any> {
		return Object.entries(item).reduce(
			(acc, [key, value]) => {
				if ("S" in value) {
					acc[key] = value.S;
				}
				return acc;
			},
			{} as Record<string, any>
		);
	}
}
