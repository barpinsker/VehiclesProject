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
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateCar,GetSpecificCar,UpdateCar } from 'src/dtoValidation/vehicle.entity.swagger';
  
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  // Get a new Id
  @Get('data/newId')
  @ApiResponse({status: 200,example:{message: 'id:2'}})
  GetNewId() {
    return this.vehicleService.getNewId();
  }
  // Get all vehicles with and without conditions, without creating a GET request
  @Get('data/allcars')
  @ApiOperation({ summary: 'Get all car' })
  @ApiResponse({example:{statusCode: 200,message: 'carList[{},{},{}]'}})
  @ApiParam({name:'flagStatus',example:'active',description:`Enter status='active' -> all cars by status active | Enter status= 'inactive' -> all cars by status inactive | Enter status='empty' -> all cars`})
  getAllCars(@Query('status') status: string) {
    if (status!='empty') {
      return this.vehicleService.getAllCarsByStatus(status);
    } else {
      return this.vehicleService.getAllCars();
    }
  }
  // Get Specific Car
  @Get(':id')
  @ApiOperation({ summary: 'Get Specific Car' })
  @ApiResponse({status: 200,example:{message: "data:{id: 3,licensePlate: '345-67-890',manufacturer: 'Ford',model: 'Mustang',status: 'active',createdAt: '2023-03-01',updatedAt: '2023-03-15'}"}})
  @ApiResponse({status:404,example:{message: "Vehicle not found"}})
  @ApiParam({name:'idCar',example:'14',description:`Enter Id Car`})
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
  @ApiOperation({ summary: 'Add Car' })
  @ApiResponse({status: 200,example:{message: 'Vehicle successfully created!'}})
  @ApiResponse({status: 400,example:{message: 'Failed to create vehicle.'}})
  @ApiBody({type:CreateCar})
  async createCar(@Body() data: CreateVehicleDto,@Res() res:Response) {
    try {
      const vehicle = await this.vehicleService.createCar(data['data']);
      return res.status(200).json({
        statusCode: 200,
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
  @ApiOperation({ summary: 'Update Car' })
  @ApiBody({type:UpdateCar})
  @ApiResponse({status: 200,example:{message: 'The vehicle id=1 update was successful'}})
  @ApiResponse({status: 404,example:{message: 'Vehicle with id=1 not found.'}})
  @ApiResponse({status: 400,example:{message: 'The update could not be completed because one or more of the details are incorrect.'}})
  async update(
    @Param('id') id: number, 
    @Body() updateVehicleDto: updateVehicleDto, 
    @Res() res: Response
  ) {
    try {
      const vehicle = await this.vehicleService.updateCar(updateVehicleDto, id);
      if (!vehicle) {
        return res.status(404).json({
          message: `Vehicle with id=${id} not found.`,
        });
      }
      return res.status(200).json({
        message: `The vehicle id=${id} update was successful`,
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
  @ApiResponse({status: 200,example:{message: "The vehicle has been successfully deleted."}})
  @ApiResponse({status: 500,example:{message: "Failed to delete vehicle due to a server error."}})
  @ApiResponse({status: 404,example:{message: "Vehicle not found."}})
  @ApiParam({name:'idCar',example:'14',description:`Enter Id Car`})
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

