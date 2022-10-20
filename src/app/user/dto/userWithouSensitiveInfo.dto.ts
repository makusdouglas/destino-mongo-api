import { User } from '../domain/user.entity';

export type UserWithoutSensitiveInfo = Omit<User, 'password'>;
