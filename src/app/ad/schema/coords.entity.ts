import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Coords {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    default: 'Point',
  })
  type: string;

  @Column()
  cordinates: number[]; // lat - long - alt

  @Column()
  adress: string;

  @Column()
  name: string;
}
