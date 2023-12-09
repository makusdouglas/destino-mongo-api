import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/app/auth/guards/decorators/public.decorator';
import { UserService } from '../business/user.service';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserWithoutSensitiveInfo } from '../dto/userWithouSensitiveInfo.dto';
import { CurrentUser } from 'src/app/auth/guards/decorators/currentUser.decorator';
import { CurrentUserDTO } from 'src/app/auth/guards/dto/currentUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':usernameOrEmail')
  findUserByUserNameOrEmail(
    @Param('usernameOrEmail') usernameOrEmail: string,
  ): Promise<UserWithoutSensitiveInfo> {
    return this.userService.getSeneitiveUserByEmailOrUsername(usernameOrEmail);
  }

  @Public()
  @Post()
  createUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserWithoutSensitiveInfo> {
    return this.userService.createUser(userData);
  }

  @Put()
  updateUser(
    @Body() userData: UpdateUserDto,
    @CurrentUser() currentUser: CurrentUserDTO,
  ): void {
    console.log('userData', userData);
    return this.userService.updateUserById(currentUser.userId, userData);
  }
}
