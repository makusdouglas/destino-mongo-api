import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CryptoService } from 'src/app/auth/business/crypto.service';
import { UpdateWriteOpResult } from 'typeorm';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserWithoutSensitiveInfo } from '../dto/userWithouSensitiveInfo.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async createUser(newUser: CreateUserDto): Promise<UserWithoutSensitiveInfo> {
    const userExists = await this.checkIfUsernameOrEmailAlreadyExists(
      newUser.email,
      newUser.username,
    );
    if (userExists)
      throw new BadRequestException('username or email adress already in use');

    const user = this.userRepository.create();

    const passwordHash = this.cryptoService.encryptText(newUser.password);

    user.name = newUser.name;
    user.username = newUser.username;
    user.email = newUser.email;
    user.phone = newUser.phone;
    user.active = false;
    user.attendedAds = [];
    user.interest = newUser.interest;
    user.password = passwordHash;
    user.photo = '';
    user.pontuation = 0;
    user.token = [];
    user.type = '';

    await this.userRepository.createCollectionIndex(
      {
        username: 1,
      },
      {
        unique: true,
      },
    );
    await this.userRepository.createCollectionIndex(
      {
        email: 1,
      },
      {
        unique: true,
      },
    );
    try {
      const { password, ...createdUser } = await this.userRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new BadRequestException('Fail to create a new user');
    }
  }

  async checkIfUsernameOrEmailAlreadyExists(
    email: string,
    username: string,
  ): Promise<boolean> {
    const existingEmail = await this.findUserByEmailOrUsername(email);
    const existingUsername = await this.findUserByEmailOrUsername(username);
    return !!existingEmail || !!existingUsername;
  }

  async findUserByEmailOrUsername(usernameOrEmail: string): Promise<User> {
    return await this.userRepository.findUserByEmailOrUsername(usernameOrEmail);
  }

  async updateUserById(
    id: string,
    userData: UpdateUserDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.userRepository.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: userData,
      },
    );
  }

  // async findUserByPasswordAndUsernameOrEmail(
  //   emailOrUsername: string,
  //   password: string,
  // ): Promise<UserWithoutSensitiveInfo> {
  //   return this.userRepository.findUserByPasswordAndUsernameOrEmail(
  //     emailOrUsername,
  //     password,
  //   );
  // }
}
