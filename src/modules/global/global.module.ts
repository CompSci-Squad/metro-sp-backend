import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { StationEntity } from '../station/entities/station.entity';
import { EntranceEntity } from '../entrance/entities/entrance.entity';
import { TerminalEntity } from '../terminal/entities/terminal.entity';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([
      UserEntity,
      StationEntity,
      EntranceEntity,
      TerminalEntity,
    ]),
  ],
  exports: [MikroOrmModule],
})
export class GlobalModule {}
