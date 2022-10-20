import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Coords {
  @ObjectIdColumn()
  _id: ObjectID;

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
