import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdModule } from './ad/ad.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      database: process.env.MONGO_DATABASE,
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      autoLoadEntities: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    AdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
