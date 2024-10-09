import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreatorService } from './services';
import { UserEntity } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StationEntity } from '../station/entities/station.entity';

@Module({
  controllers: [UserController],
  providers: [CreatorService],
})
export class UserModule {}
