import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	MikroOrmModuleOptions,
	MikroOrmOptionsFactory,
} from "@mikro-orm/nestjs";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Migrator } from "@mikro-orm/migrations";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	createMikroOrmOptions(): MikroOrmModuleOptions {
		return {
			host: this.configService.get("DB_HOST"),
			port: Number(this.configService.get("DB_PORT")),
			user: this.configService.get("DB_USER"),
			password: this.configService.get("DB_PASSWORD"),
			dbName: "coreDb",
            driver: PostgreSqlDriver,
			entities: ["dist/**/*.entity.js"],
			entitiesTs: ["src/**/*.entity.ts"],
			debug: true,
			allowGlobalContext: true,
			highlighter: new SqlHighlighter(),
			metadataProvider: TsMorphMetadataProvider,
			registerRequestContext: false,
			extensions: [Migrator, EntityGenerator],
			migrations: {
				path: "databse/migrations",
			},
		};
	}
}
