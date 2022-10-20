import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUserDTO } from 'src/app/auth/guards/dto/currentUser.dto';
import { Ad } from '../domain/ad.entity';
import { createAdDto } from '../dto/createAd.dto';
import { AdStatus } from '../enum/adStatus.enum';
import { AdRepository } from '../repository/ad.repository';

@Injectable()
export class AdService {
  constructor(private adRepository: AdRepository) {}

  async findAll(skip = 0, take = 20): Promise<Ad[]> {
    return await this.adRepository.findAll(skip, take);
  }
  async createAd(
    currentUser: CurrentUserDTO,
    adData: createAdDto,
  ): Promise<Ad> {
    return await this.adRepository.createAd(currentUser.userId, adData);
  }

  async subscribeUserToAdd(currentUser: CurrentUserDTO, adId: string) {
    console.log('adId', adId);

    const ad = await this.adRepository.findAdById(adId);

    if (!ad) throw new NotFoundException('ad not found');

    if (ad && ad.userId === currentUser.userId) {
      throw new BadRequestException('You cannot subscribe to your own ad');
    }

    if (!!ad?.userAttending && ad.userAttending !== currentUser.userId) {
      throw new BadRequestException(
        'Ad is already being attended by another user',
      );
    }
    return await this.adRepository.updateAd(adId, {
      userAttending: currentUser.userId,
    });
  }

  async findAdById(adId: string): Promise<Ad> {
    return this.adRepository.findAdById(adId);
  }

  async findAdsAttendingByUserId(currentUser: CurrentUserDTO): Promise<Ad[]> {
    return await this.adRepository.findAdsAttendingByUserId(currentUser.userId);
  }
  async findAdsCreatedByUserId(currentUser: CurrentUserDTO): Promise<Ad[]> {
    return await this.adRepository.findAdsCreatedByUserId(currentUser.userId);
  }
}
