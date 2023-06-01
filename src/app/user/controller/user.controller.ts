import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/app/auth/guards/decorators/public.decorator';
import { UserService } from '../business/user.service';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserWithoutSensitiveInfo } from '../dto/userWithouSensitiveInfo.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':usernameOrEmail')
  findUserByUserNameOrEmail(
    @Param('usernameOrEmail') usernameOrEmail: string,
  ): Promise<UserWithoutSensitiveInfo> {
    return this.userService.findUserByEmailOrUsername(usernameOrEmail);
  }

  @Public()
  @Post()
  createUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserWithoutSensitiveInfo> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(
    @Param(':id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUserById(id, userData);
  }
}
