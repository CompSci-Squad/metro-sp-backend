import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { StationModule } from './station/station.module';

@Module({
  imports: [UserModule, StationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
