import { BaseDynamoEntity } from "../../../shared/entities/dynamo";
import { LogLevel } from "../enums/log-level.enum";

export class LogEntity extends BaseDynamoEntity {
	message: string;

	timestamp: string;

	level?: LogLevel;

	constructor(
		id: string,
		message: string,
		timestamp: string,
		level?: LogLevel
	) {
		super(id);
		this.message = message;
		this.timestamp = timestamp;
		this.level = level;
	}
}
