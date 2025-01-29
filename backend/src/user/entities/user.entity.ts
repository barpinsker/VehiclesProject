import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'vehicle'})
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate : string;

  @Column({ unique: false })
  manufacturer : string;

  @Column()
  model : string;

  @Column()
  status  : string;

  @Column()
  createdAt  : string;

  @Column()
  updatedAt   : Date;
}