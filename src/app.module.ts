import {
	MiddlewareConsumer,
	Module,
	NestModule,
	OnModuleInit,
} from "@nestjs/common";
import { MikroORM } from "@mikro-orm/postgresql";
import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";
import { StationModule } from "./modules/station/station.module";
import { PostgreSqlMikroORM } from "@mikro-orm/postgresql/PostgreSqlMikroORM"; 
import mikroOrmConfig from "./shared/config/mikro-orm.config";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [StationModule, MikroOrmModule.forRoot(mikroOrmConfig), ConfigModule.forRoot()],
})
export class AppModule implements OnModuleInit {
	constructor(private readonly orm: PostgreSqlMikroORM) {}

	async onModuleInit(): Promise<void> {
		await this.orm.getMigrator().up();
	}

	// configure(consumer: MiddlewareConsumer) {
	// 	consumer.apply(MikroOrmMiddleware).forRoutes("*");
	// }
}
