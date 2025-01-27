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
     console.log(status==='false'?false:true)
     if(status){
     return this.vehicleService.getAllCarsByStatus(status==='false'?false:true);}
  else{
     return this.vehicleService.getAllCars()
  }
}
// Creating a POST request to add a new vehicle
@Post('create')  
createCar(@Body() data:{name:string}){
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
