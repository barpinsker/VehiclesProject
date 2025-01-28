import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
@Injectable()
export class VehicleService {
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
    return this.cars;
  }
  getSpecificCars(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return car;
  }
  getNewId() {
    return (this.cars.length + 1).toString();
  }

  // Request all vehicles based on their status
  getAllCarsByStatus(status: string) {
    const carsActive = [];
    this.cars.map((car: any) => {
      if (car.status === status) {
        carsActive.push(car);
      }
    });
    return carsActive;
  }
  // Adding a new vehicle
  createCar(car: any) {
    //  "id": (this.cars.length+1).toString(),"licensePlate": "345-67-890","manufacturer": "Ford","model": "Mustang","status": "active","createdAt": "2023-03-01T09:00:00Z","updatedAt": "2023-03-15T12:45:00Z"
    car.updatedAt = format(new Date(), 'yyyy-MM-dd');
    this.cars.push({
      id: (this.cars.length + 1).toString(),
      licensePlate: car.licensePlate,
      manufacturer: car.manufacturer,
      model: car.model,
      status: car.status,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    });
    return this.cars;
  }
  // Update an existing vehicle, and if it doesn't exist, throw an error
  updateCar(car: any, id: string) {
    const indexCar = this.cars.findIndex((car) => car.id === id);
    if (indexCar == -1) {
      return `The id ${id} is not a found`;
    } else {
      for (let header of this.detailsCarUpdate) {
        this.cars[indexCar][header] = car[header];
      }
      this.cars[indexCar].updatedAt = format(new Date(), 'yyyy-MM-dd');
      return this.cars;
    }
  }
  // Delete an existing vehicle only if its ID exists
  removeCar(id: string) {
    const indexRow = this.cars.findIndex((car) => car.id === id);
    if (indexRow == -1) {
      return `The id ${id} is not a found`;
    } else {
      this.cars.splice(indexRow, 1);
      return this.cars;
    }
  }
}
