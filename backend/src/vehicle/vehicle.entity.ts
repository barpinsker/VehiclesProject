import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'vehicle'})
export class VehicleTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate : string;

  @Column({ unique: true })
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