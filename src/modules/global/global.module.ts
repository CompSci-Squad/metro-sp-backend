import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import { StationEntity } from "../station/entities/station.entity";

@Global()
@Module({
    imports: [MikroOrmModule.forFeature([UserEntity, StationEntity])],
    exports: [MikroOrmModule]
})
export class GlobalModule {}