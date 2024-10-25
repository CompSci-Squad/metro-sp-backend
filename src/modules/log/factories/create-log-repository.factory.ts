import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ConfigService } from "@nestjs/config";
import { LogRepository } from "../repositories/log.repository";

export function createLogRepositoryFactory(
	configService: ConfigService
): LogRepository {
	const dbClient = new DynamoDBClient({
		region: configService.get<string>("DYNAMODB_REGION") || "local",
		endpoint:
			configService.get<string>("DYNAMODB_ENDPOINT") || "http://localhost:8000",
		credentials: {
			accessKeyId: configService.get<string>("AWS_ACCESS_KEY_ID") || "",
			secretAccessKey: configService.get<string>("AWS_SECRET_ACCESS_KEY") || "",
		},
	});

	const docClient = DynamoDBDocumentClient.from(dbClient);
	return new LogRepository(dbClient, docClient);
}
