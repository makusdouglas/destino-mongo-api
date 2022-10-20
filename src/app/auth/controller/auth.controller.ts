import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../business/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { User } from '../../user/domain/user.entity';
import { Public } from '../guards/decorators/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post()
  async signIn(@Req() request: Request) {
    return this.authService.signIn(request.user as Omit<User, 'password'>);
  }
}
