import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from '../../modules/user/enums/user-permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: UserPermissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
