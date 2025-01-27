import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleService {
     private readonly cars = [
          { id:"1",nameCar: 'seat', numberCar: '12345',active:false },
          { id:"2",nameCar: 'mazda', numberCar: '2342',active:false },
          { id:"3",nameCar: 'mercedes', numberCar: '5432',active:false }
     ]
     // Request all vehicles without the need for a filter
     getAllCars(){
          return this.cars
     }
     // Request all vehicles based on their status
     getAllCarsByStatus(status:Boolean){
          const carsActive=[]
          this.cars.map((car:any)=>{
               if(car.active===status){
                    carsActive.push(car)
               }
          })
          return carsActive
     }
     // Adding a new vehicle
     createCar(car:any){
          this.cars.push({id:(this.cars.length+1).toString(),nameCar:car.name,numberCar:(Math.floor(Math.random() * 9999) +1000).toString(),active:false})
          return this.cars
     }
     // Update an existing vehicle, and if it doesn't exist, throw an error
     updateCar(car:any,id:string){
          const indexCar=this.cars.findIndex(car=>car.id===id)
          if(indexCar==-1){
               return `The id ${id} is not a found`
          }
          else{
               this.cars[indexCar].nameCar=car.name
               this.cars[indexCar].active=car.active
               return this.cars
          }
     }
     // Delete an existing vehicle only if its ID exists
     removeCar(id:string){
          const indexRow=this.cars.findIndex(car=>car.id===id)
          if(indexRow==-1){
               return `The id ${id} is not a found`
          }
          else{
               this.cars.splice(indexRow,1)
               return this.cars
          }
     }
}
