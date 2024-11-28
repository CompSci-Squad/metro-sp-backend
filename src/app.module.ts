import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { StationModule } from './modules/station/station.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    GlobalModule,
    StationModule,
    UserModule,
  ],
})
export class AppModule implements OnModuleInit, NestModule {
  private orm: MikroORM;

  async onModuleInit(): Promise<void> {
    this.orm = await MikroORM.init();
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
