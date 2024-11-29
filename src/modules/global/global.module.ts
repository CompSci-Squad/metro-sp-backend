import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import { StationEntity } from "../station/entities/station.entity";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
    imports: [MikroOrmModule.forFeature([UserEntity, StationEntity]), HttpModule],
    exports: [MikroOrmModule, HttpModule]
})
export class GlobalModule {}