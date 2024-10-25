import { Injectable } from "@nestjs/common";
import { DynamoDBRepository } from "../../../shared/repositories/dynamo.repository"; // Path to your generic repository
import { LogEntity } from "../entities/log.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LogRepository extends DynamoDBRepository<
	LogEntity,
	{ id: string }
> {
	protected tableName = "logs";

	constructor(private readonly configService: ConfigService) {
		super(configService);
	}
}
