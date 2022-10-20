import { forwardRef, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './business/auth.service';
import { CryptoService } from './business/crypto.service';
import { AuthController } from './controller/auth.controller';
import { LocalStrategy } from './guards/local.authentication.strategy';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { JwtAuthSrategy } from './guards/jwtAuth.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: { expiresIn: '8h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    CryptoService,
    AuthService,
    LocalStrategy,
    JwtAuthSrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CryptoService],
})
export class AuthModule {}
