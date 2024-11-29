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
import { EntranceModule } from './modules/entrance/entrance.module';
import { TerminalModule } from './modules/terminal/terminal.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LogModule } from './modules/log/log.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    GlobalModule,
    StationModule,
    UserModule,
    EntranceModule,
    TerminalModule,
    AuthModule,
    JwtModule,
    LogModule,
    PassengerModule,
    AIModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
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
