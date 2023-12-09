import { ObjectId } from 'mongodb';
import { User } from '../domain/user.entity';

export type UserWithoutSensitiveInfo = Omit<
  User,
  'password' | 'active' | 'token' | '_id'
> & {
  id: ObjectId;
};
