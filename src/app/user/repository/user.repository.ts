import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserWithoutSensitiveInfo } from '../dto/userWithouSensitiveInfo.dto';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  //   findUserByPasswordAndUsernameOrEmail(
  //     emailOrUsername: string,
  //     password: string,
  //   ): Promise<UserWithoutSensitiveInfo> {
  //     const user = this.findOne({
  //       where: {
  //         $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  //         password,
  //       },
  //     });
  //   }

  async findUserByEmailOrUsername(usernameOremail: string): Promise<User> {
    const [user] = await this.find({
      where: {
        $or: [{ email: usernameOremail }, { username: usernameOremail }],
      },
    });
    return user;
  }
}
