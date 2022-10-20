import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isEnum } from 'class-validator';
import { ObjectId } from 'mongodb';
import { DataSource, FindOptionsUtils, MongoRepository } from 'typeorm';
import { Ad } from '../domain/ad.entity';
import { createAdDto } from '../dto/createAd.dto';
import { AdStatus } from '../enum/adStatus.enum';

@Injectable()
export class AdRepository extends MongoRepository<Ad> {
  constructor(dataSource: DataSource) {
    super(Ad, dataSource.createEntityManager());
  }

  createAd(userId: string, adData: createAdDto) {
    const {
      amount,
      availability,
      description,
      location,
      materialType,
      operation,
      photo,
      type,
      unity,
    } = adData;

    const ad = this.create();
    ad.userId = userId;
    ad.active = true;
    ad.amount = amount;
    ad.availability = availability;
    ad.description = description;
    ad.location = location;
    ad.materialType = materialType;
    ad.operation = operation;
    ad.photo = photo;
    ad.type = type;
    ad.unity = unity;
    ad.userAttending = null;
    ad.status = AdStatus.AVAILABLE;

    try {
      return this.save(ad);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Fail to create new Ad');
    }
  }

  async findAll(skip = 0, take = 1): Promise<Ad[]> {
    return this.find({
      take,
      skip,
    });
  }
  async findAdById(id: string): Promise<Ad> {
    try {
      const [ad] = await this.find({
        where: {
          _id: new ObjectId(id),
        },
      });
      if (!ad) throw new NotFoundException('Ad not found');
      return ad;
    } catch (error) {
      throw new NotFoundException('Ad not found');
    }
  }

  async findAdsAttendingByUserId(userId: string): Promise<Ad[]> {
    return await this.find({
      where: {
        userAttending: userId,
      },
    });
  }
  async findAdsCreatedByUserId(userId: string): Promise<Ad[]> {
    return await this.find({
      where: {
        userId: userId,
      },
    });
  }

  async updateAd(adId: string, adData: Partial<Ad>) {
    return await this.updateOne(
      { _id: new ObjectId(adId) },
      {
        $set: adData,
      },
    );
  }
}
