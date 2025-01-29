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
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Response } from 'express';
import { validate } from 'class-validator';
import { CreateVehicleDto } from 'src/dtoValidation/create-vehicle.dto';
import { updateVehicleDto } from 'src/dtoValidation/update-vehicle.dto';


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

  @Get(':id')
  async getSpecificCars(@Param('id') id: number ,@Res() res: Response) {
    const vehicle = await  this.vehicleService.getSpecificCars(id);
    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found',
        statusCode: 404,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: vehicle
    })
  }


  // Creating a POST request to add a new vehicle
  @Post('create')
  async createCar(@Body() data: CreateVehicleDto,@Res() res:Response) {
    try {
      const vehicle = await this.vehicleService.createCar(data);
      return res.status(201).json({
        statusCode: 201,
        message: 'Vehicle successfully created!',
        data: vehicle,
      });
    } catch (error) {
  
      return res.status(400).json({
        statusCode: 400,
        message: 'Failed to create vehicle.',
        error: error.message,
      });
    }
  }
  // Creating a PUT request to update an existing vehicle
  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateVehicleDto: updateVehicleDto, 
    @Res() res: Response
  ) {
    try {
      const vehicle = await this.vehicleService.updateCar(updateVehicleDto, id);
      if (!vehicle) {
        return res.status(404).json({
          message: `Vehicle with id ${id} not found.`,
        });
      }
      return res.status(200).json({
        message: `The vehicle ${id} update was successful`,
        data: vehicle,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'The update could not be completed because one or more of the details are incorrect.',
        error: error.message,
      });
    }
  }
  // Creating a DELETE request to delete an existing vehicle
  @Delete(':id')
  async removeVehicle(@Param('id') id: number ,@Res() res:Response) {
    try {
      const result:any = await this.vehicleService.removeCar(id);
      if (result.affected === 0) {
        return res.status(404).json({
          message: 'Vehicle not found.',
        });
      }
      return res.status(200).json({
        message: 'The vehicle has been successfully deleted.',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to delete vehicle due to a server error.',
        error: error.message,
      });
    }
  }
}
