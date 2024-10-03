import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreatorService } from './services';

@Module({
  controllers: [UserController],
  providers: [UserService, CreatorService],
})
export class UserModule {}
