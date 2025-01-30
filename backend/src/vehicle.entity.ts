import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('vehicleDB')
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

  @Column({ type: 'varchar', length: 50 })
  createdAt: string;  // תאריך יצירה

  @Column({ type: 'varchar', length: 50 })
  updatedAt: string;  // תאריך עדכון אחרון
}

