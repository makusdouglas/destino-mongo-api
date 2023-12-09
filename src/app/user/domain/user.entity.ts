import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { UserInterest } from '../enum/userInterest.dto';
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  @PrimaryColumn()
  _id: ObjectId;

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
  attendedAds: ObjectId[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
