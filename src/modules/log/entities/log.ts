
import { LogLevel } from "../enums/log-level.enum";

export class LogEntity {
	id: string;

	message: string;

    timestamp: string;

	level?: LogLevel;

}
