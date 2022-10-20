import { ObjectIdColumn, ObjectID, Column, Entity } from 'typeorm';

@Entity()
export class DayOfWeek {
  @ObjectIdColumn()
  _id: ObjectID;

  /**
   * 0 - sunday
   * 1 - Monday
   * 2 - Tuesday
   * 3 - Wednesday
   * 4 - Thursday
   * 5 - Fiday
   * 6 - Saturday
   */
  @Column()
  day: number;

  @Column()
  initialTime: string; // hh:mm = 00:00 - 23:59

  @Column()
  finalTime: string; // hh:mm = 00:00 - 23:59
}
