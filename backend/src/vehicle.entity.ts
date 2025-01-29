import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;  // מזהה יחודי

  @Column({ type: 'varchar', length: 50, unique: true })
  licensePlate: string;  // מספר רישוי

  @Column({ type: 'varchar', length: 100 })
  manufacturer: string;  // יצרן הרכב

  @Column({ type: 'varchar', length: 100 })
  model: string;  // דגם הרכב

  @Column({ type: 'varchar', length: 50 })
  status: string;  // סטטוס הרכב

  @CreateDateColumn()
  createdAt: string;  // תאריך יצירה

  @UpdateDateColumn()
  updatedAt: string;  // תאריך עדכון אחרון
}

