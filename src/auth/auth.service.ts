import { Injectable } from '@nestjs/common';
import { FinderService } from '../modules/user/services/finder.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserTokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly finderService: FinderService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = await this.jwtService.signAsync(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string): Promise<Partial<UserEntity>> {
    const user = await this.finderService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Endereço de email ou senha incorreto');
  }
}
