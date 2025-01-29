import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(user) private userRepository: Repository<user>){}
  async create(car: any) {
    console.log("insert")
    const newCar = this.userRepository.create({
          licensePlate: car.licensePlate,
          manufacturer: car.manufacturer,
          model: car.model,
          status: car.status,
          createdAt: car.createdAt,
          updatedAt: car.updatedAt,
      })
    return this.userRepository.save(newCar);

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
     
  detailsCarUpdate: any = ['licensePlate', 'manufacturer', 'model', 'status'];
  // Request all vehicles without the need for a filter
  // getAllCars() {
  //   return this.cars;
  // }
  // getSpecificCars(id: string) {
  //   const car = this.cars.find((car) => car.id === id);
  //   if (!car) {
  //     throw new NotFoundException(`Item with id ${id} not found`);
  //   }
  //   return car;
  // }
  // getNewId() {
  //   return (this.cars.length + 1).toString();
  // }

  // // Request all vehicles based on their status
  // getAllCarsByStatus(status: string) {
  //   const carsActive = [];
  //   this.cars.map((car: any) => {
  //     if (car.status === status) {
  //       carsActive.push(car);
  //     }
  //   });
  //   return carsActive;
  // }
  // // Adding a new vehicle
  // async createCar(car: any) {
  //   car.updatedAt = format(new Date(), 'yyyy-MM-dd');
  //   const newCar = this.userRepository.create({
  //     licensePlate: car.licensePlate,
  //     manufacturer: car.manufacturer,
  //     model: car.model,
  //     status: car.status,
  //     createdAt: car.createdAt,
  //     updatedAt: car.updatedAt,
  // })

  // return await this.userRepository.save(newCar);
  // }
    
  //   // Update an existing vehicle, and if it doesn't exist, throw an error
  //   updateCar(car: any, id: string) {
  //     const indexCar = this.cars.findIndex((car) => car.id === id);
  //     if (indexCar == -1) {
  //       return `The id ${id} is not a found`;
  //     } else {
  //       for (let header of this.detailsCarUpdate) {
  //         this.cars[indexCar][header] = car[header];
  //       }
  //       this.cars[indexCar].updatedAt = format(new Date(), 'yyyy-MM-dd');
  //       return this.cars;
  //     }
  //   }
  //   // Delete an existing vehicle only if its ID exists
  //   removeCar(id: string) {
  //     const indexRow = this.cars.findIndex((car) => car.id === id);
  //     if (indexRow == -1) {
  //       return `The id ${id} is not a found`;
  //     } else {
  //       this.cars.splice(indexRow, 1);
  //       return this.cars;
  //     }
  //   }

}
