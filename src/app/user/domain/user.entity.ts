import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserInterest } from '../enum/userInterest.dto';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Index({ unique: true })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Index({ unique: true })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    default: 0,
  })
  pontuation: number;

  @Column({
    nullable: false,
  })
  interest: UserInterest;

  @Column()
  phone: string;

  @Column()
  photo: string;

  @Column()
  type: string;

  @Column()
  token: string[];

  @Column()
  cep: string;

  @Column()
  attendedAds: ObjectID[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
