import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdService } from './business/ad.service';
import { AdController } from './controller/ad.controller';
import { Ad } from './domain/ad.entity';
import { AdRepository } from './repository/ad.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ad])],
  controllers: [AdController],
  providers: [AdService, AdRepository],
  exports: [AdService],
})
export class AdModule {}
