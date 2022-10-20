import { createParamDecorator } from '@nestjs/common';
import { CurrentUserDTO } from '../dto/currentUser.dto';

export const CurrentUser = createParamDecorator(
  (data: string, req): CurrentUserDTO => req?.args[0]?.user,
);
