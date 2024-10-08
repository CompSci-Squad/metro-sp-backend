import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreatorService } from './services';

@Module({
  controllers: [UserController],
  providers: [CreatorService],
})
export class UserModule {}
