import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Query,
  Body,
  HttpCode,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { query } from 'express';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // Get a new Id
  @Get('data/newId')
  GetNewId() {
    return this.vehicleService.getNewId();
  }
  // Get all vehicles with and without conditions, without creating a GET request
  @Get('data/allcars')
  getAllCars(@Query('active') status: string) {
    if (status) {
      return this.vehicleService.getAllCarsByStatus(status);
    } else {
      return this.vehicleService.getAllCars();
    }
  }
  //  Creating a GET request to spacific car
  @Get(':id')
  getSpecificCars(@Param('id') id: string) {
    return this.vehicleService.getSpecificCars(id);
  }

  // Creating a POST request to add a new vehicle
  @Post('create')
  createCar(
    @Body()
    data: {
      id: string;
      licensePlate: string;
      manufacturer: string;
      model: string;
      status: string;
      createdAt: string;
    },
  ) {
    return this.vehicleService.createCar(data);
  }
  // Creating a PUT request to update an existing vehicle
  @Put(':id')
  updateVehicle(
    @Param('id') id: string,
    @Body()
    body: {
      id: string;
      licensePlate: string;
      manufacturer: string;
      model: string;
      status: string;
      createdAt: string;
    },
  ) {
    return this.vehicleService.updateCar(body, id);
  }
  // Creating a DELETE request to delete an existing vehicle
  @Delete(':id')
  removeVehicle(@Param('id') id: string) {
    return this.vehicleService.removeCar(id);
  }
}
