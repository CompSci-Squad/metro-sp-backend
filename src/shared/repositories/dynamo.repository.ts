import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

class DynamoDBRepository {
    private tableName: string;
    private docClient: DynamoDBDocumentClient;

    constructor(tableName: string, endpoint: string = "http://localhost:8000") {
        const client = new DynamoDBClient({
            region: "local",
            endpoint: endpoint // Points to local DynamoDB
        });
        this.docClient = DynamoDBDocumentClient.from(client);
        this.tableName = tableName;
    }

    async createItem(item: Record<string, any>) {
        const params = {
            TableName: this.tableName,
            Item: item,
        };
        return await this.docClient.send(new PutCommand(params));
    }

    async getItem(key: Record<string, any>) {
        const params = {
            TableName: this.tableName,
            Key: key,
        };
        const result = await this.docClient.send(new GetCommand(params));
        return result.Item;
    }

    async updateItem(key: Record<string, any>, updateExpression: string, expressionValues: Record<string, any>) {
        const params = {
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionValues,
            ReturnValues: "UPDATED_NEW",
        };
        return await this.docClient.send(new UpdateCommand(params));
    }

    async deleteItem(key: Record<string, any>) {
        const params = {
            TableName: this.tableName,
            Key: key,
        };
        return await this.docClient.send(new DeleteCommand(params));
    }

    async queryItems(keyConditionExpression: string, expressionValues: Record<string, any>) {
        const params = {
            TableName: this.tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionValues,
        };
        const result = await this.docClient.send(new QueryCommand(params));
        return result.Items;
    }
}

// Usage Example
(async () => {
    const repo = new DynamoDBRepository('my_table', "http://localhost:8000");

    // Add an item
    await repo.createItem({ id: '123', name: 'Sample Item', category: 'test' });

    // Fetch the item
    const fetchedItem = await repo.getItem({ id: '123' });
    console.log(fetchedItem);

    // Update the item
    await repo.updateItem(
        { id: '123' },
        "SET #nm = :name",
        { ':name': 'Updated Name', '#nm': 'name' }
    );

    // Delete the item
    await repo.deleteItem({ id: '123' });
})();
