import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from 'src/app/auth/guards/decorators/currentUser.decorator';
import { CurrentUserDTO } from 'src/app/auth/guards/dto/currentUser.dto';
import { AdService } from '../business/ad.service';
import { Ad } from '../domain/ad.entity';
import { createAdDto } from '../dto/createAd.dto';
import { AdStatus } from '../enum/adStatus.enum';

@Controller('ads')
export class AdController {
  constructor(private adService: AdService) {}
  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('status') status?: AdStatus,
  ): Promise<Ad[]> {
    return this.adService.findAll(skip, take);
  }

  @Get('attending')
  findAdsAttendingByUserId(
    @CurrentUser() currentUser: CurrentUserDTO,
  ): Promise<Ad[]> {
    return this.adService.findAdsAttendingByUserId(currentUser);
  }

  @Get('me')
  findAdsCreatedByUserId(
    @CurrentUser() currentUser: CurrentUserDTO,
  ): Promise<Ad[]> {
    return this.adService.findAdsCreatedByUserId(currentUser);
  }

  @Get(':adId')
  findAdById(@Param('adId') adId: string): Promise<Ad> {
    return this.adService.findAdById(adId);
  }

  @Post()
  createAd(
    @CurrentUser() currentUser: CurrentUserDTO,
    @Body() adData: createAdDto,
  ) {
    return this.adService.createAd(currentUser, adData);
  }

  @Put('/subscribe/:adId')
  subscribeUserToAdd(
    @CurrentUser() currentUser: CurrentUserDTO,
    @Param('adId') adId: string,
  ) {
    return this.adService.subscribeUserToAdd(currentUser, adId);
  }
}
