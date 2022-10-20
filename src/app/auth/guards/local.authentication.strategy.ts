import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../business/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  '@AuthUserWithPasswordAndUsernameOrEmail',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'usernameOrEmail',
      passwordField: 'password',
    });
  }

  async validate(usernameOrEmail: string, password: string) {
    const user = await this.authService.validateUser(usernameOrEmail, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
