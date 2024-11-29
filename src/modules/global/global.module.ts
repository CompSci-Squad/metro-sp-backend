import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { StationEntity } from '../station/entities/station.entity';
import { EntranceEntity } from '../entrance/entities/entrance.entity';
import { TerminalEntity } from '../terminal/entities/terminal.entity';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([
      UserEntity,
      StationEntity,
      EntranceEntity,
      TerminalEntity,
    ]),
    HttpModule,
  ],
  exports: [MikroOrmModule, HttpModule],
})
export class GlobalModule {}
