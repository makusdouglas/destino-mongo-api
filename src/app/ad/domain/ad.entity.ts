import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdStatus } from '../enum/adStatus.enum';
import { MaterialType } from '../enum/materialType.enum';
import { OperationType } from '../enum/operationType.enum';
import { Coords } from '../schema/coords.entity';
import { DayOfWeek } from '../schema/dayOfWeek.entity';

@Entity('ads')
export class Ad {
  @ObjectIdColumn()
  @PrimaryColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  description: string;

  @Column({
    enum: ['offer', 'order'],
  })
  type: string; // offer / order

  @Column({
    enum: ['sale', 'exchange', 'donation'],
  })
  operation: OperationType; // sale / exchange / donation

  @Column(() => DayOfWeek)
  availability: DayOfWeek[];

  @Column(() => Coords)
  location: Coords;

  @Column()
  unity: string;

  @Column({
    enum: ['available', 'in_progress', 'in_transit', 'completed'],
  })
  status: AdStatus;

  @Column({
    enum: ['metallic', 'plastic', 'electronic', 'organic'],
  })
  materialType: MaterialType;

  @Column()
  amount: number;

  @Column()
  userAttending: string;

  @Column()
  photo: string;

  @Column()
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
