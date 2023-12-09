import { User } from '../domain/user.entity';
import { UserWithoutSensitiveInfo } from '../dto/userWithouSensitiveInfo.dto';

export class RemoveUserSensitiveInfoHelper {
  constructor(user: User) {
    this.userWithoutSensitiveInfo = this.removeSensitiveInfo(user);
  }
  public userWithoutSensitiveInfo: UserWithoutSensitiveInfo;
  public removeSensitiveInfo(user: User): UserWithoutSensitiveInfo {
    return {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      pontuation: user.pontuation,
      type: user.type,
      interest: user.interest,
      attendedAds: user.attendedAds,
      cep: user.cep,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
