import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicle.entity';
import { validate } from 'class-validator';
// import { Repository } from 'typeorm';
// import { user } from 'src/user/entities/user.entity';
@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicle)
  private vehicleRepository: Repository<Vehicle>){}
  private readonly cars = [
    {
      id: '1',
      licensePlate: '123-45-678',
      manufacturer: 'Toyota',
      model: 'Corolla',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-03-10',
    },
    {
      id: '2',
      licensePlate: '234-56-789',
      manufacturer: 'Honda',
      model: 'Civic',
      status: 'inactive',
      createdAt: '2022-12-01',
      updatedAt: '2023-02-20',
    },
    {
      id: '3',
      licensePlate: '345-67-890',
      manufacturer: 'Ford',
      model: 'Mustang',
      status: 'active',
      createdAt: '2023-03-01',
      updatedAt: '2023-03-15',
    },
  ];
  detailsCarUpdate: any = ['licensePlate', 'manufacturer', 'model', 'status'];
  // Request all vehicles without the need for a filter
  getAllCars() {
    // return this.cars;
    return this.vehicleRepository.find();
  }
  async getSpecificCars(id: any) {
    const vehicle =await this.vehicleRepository.findOne({ where: { id } });
    return vehicle
 
  }
  async getNewId(): Promise<any> {
    const listCar=await this.vehicleRepository.find()
    return (listCar.length+1);
  }

  // Request all vehicles based on their status
  async getAllCarsByStatus(status: string): Promise<any> {
    const vehicle = await this.vehicleRepository.find({ where: { status } });
    return vehicle
  }
  // Adding a new vehicle
  async createCar(car: any) {
    
            // הנתונים תקינים
            car.updatedAt = new Date();
            const newCar = this.vehicleRepository.create({
            licensePlate: car.licensePlate,
            manufacturer: car.manufacturer,
            model: car.model,
            status: car.status,
            createdAt: car.createdAt,
            updatedAt: car.updatedAt,
            })
            return await this.vehicleRepository.save(newCar)
    
}
  // Update an existing vehicle, and if it doesn't exist, throw an error
  async updateCar(car: any, id: number) {
   
    car.updatedAt = new Date();
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
     // udpate data
     Object.assign(vehicle, car);

     // Save data
     return this.vehicleRepository.save(vehicle);
   
  }
  // Delete an existing vehicle only if its ID exists
 async removeCar(id: number):Promise<boolean> {
  const result = await this.vehicleRepository.delete(id);  // פה אתה פשוט מבצע את הפעולה של TypeORM

  if (result.affected === 0) {
    // אם לא הוסרו שורות, הרכב לא נמצא
    return false;
  }

  return true;
  }
}
