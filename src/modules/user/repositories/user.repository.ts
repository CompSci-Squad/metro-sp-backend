import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, number> {}