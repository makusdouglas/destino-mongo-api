import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app/user/business/user.service';
import { User } from 'src/app/user/domain/user.entity';
import { CurrentUserDTO } from '../guards/dto/currentUser.dto';
import { CryptoService } from './crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const encryptedPassword = this.cryptoService.encryptText(password);

    const user = await this.userService.findUserByEmailOrUsername(
      usernameOrEmail,
    );

    if (user && user.password === encryptedPassword) {
      delete user.password;
      return user;
    }
    return null;
  }

  signIn(user: Omit<User, 'password'>) {
    if (!user) throw new UnauthorizedException('Unauthorized');

    const payload = {
      sub: user._id,
      userId: user._id,
      name: user.name,
      email: user.email,
      // permissions: user.permissions || [],
      createdAt: new Date().toISOString(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
      userId: user._id,
      name: user.name,
      email: user.email,
      // permissions: user.permissions || [],
    };
  }

  async getProfile(currentUser: CurrentUserDTO) {
    return await this.userService.findUserById(currentUser.userId);
  }
}
