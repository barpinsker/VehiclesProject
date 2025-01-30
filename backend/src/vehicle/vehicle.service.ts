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
    console.log(car)
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
