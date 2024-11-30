import { Request } from 'express';
import { UserEntity } from '../../modules/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
