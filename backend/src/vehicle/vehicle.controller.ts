import { Controller ,Get,Post,Delete,Put, Param, Query, Body, HttpCode} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { query } from 'express';

@Controller('vehicle')
export class VehicleController {
constructor(private readonly vehicleService: VehicleService){

}
// Get all vehicles with and without conditions, without creating a GET request
@Get()
getAllCars(@Query('active')  status: string ) {
     if(status){
     return this.vehicleService.getAllCarsByStatus(status);}
  else{
     return this.vehicleService.getAllCars()
  }
}
getSpecificCars(@Query('id')  id: string ) {
     return this.vehicleService.getSpecificCars(id)
}
// Creating a POST request to add a new vehicle
@Post('create')  
createCar(@Body() data:{id: string,licensePlate: string,manufacturer: string,model: string,status: string,createdAt: string}){
     return this.vehicleService.createCar(data)
}
// Creating a PUT request to update an existing vehicle
@Put(":id")
updateVehicle(@Param('id') id: string, @Body() body: { name: string, model: string }) {
     return this.vehicleService.updateCar(body,id)
}
// Creating a DELETE request to delete an existing vehicle
@Delete(":id")
removeVehicle(@Param("id") id:string){
     return this.vehicleService.removeCar(id)
}
}
