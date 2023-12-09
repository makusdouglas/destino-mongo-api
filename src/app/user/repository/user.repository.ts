import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findUserById(userId: string): Promise<User> {
    if (!ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user id');
    }
    const objectId = new ObjectId(userId);
    const user = await this.findOne({
      // @ts-ignore
      where: {
        _id: objectId,
      },
    });
    return user;
  }

  async findUserByEmailOrUsername(usernameOremail: string): Promise<User> {
    const [user] = await this.find({
      where: {
        $or: [{ email: usernameOremail }, { username: usernameOremail }],
      },
    });
    return user;
  }
}
