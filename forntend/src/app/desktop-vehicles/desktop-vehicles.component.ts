import { Component, OnInit } from '@angular/core';
import { Headers } from './headerTable';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-desktop-vehicles',
  templateUrl: './desktop-vehicles.component.html',
  styleUrls: ['./desktop-vehicles.component.scss']
})
export class DesktopVehiclesComponent implements OnInit {
  constructor(private restApi:RestApiService){}
  carList:any[]=[]
  headers:any=new Headers().headerTable
  headerInputsModel:any=new Headers().headerInputs
  newCar:any={}
  editRowCar:any={}
  ngOnInit(): void {
    this.restApi.getAllCars('').subscribe(data=>{
      this.carList=[...data]
    },error=>{
      console.log('not found cars in a list')
    })
  }
  createNewCar(){
   this.restApi.createNewCar(this.newCar).subscribe(data=>{
    this.carList.push(this.newCar)
    this.newCar={}
    },error=>{
      console.log('לא ניתן להוסיף מכונית חדשה')
    })
  }
  getSpecificCar(id:string)
  {
    this.restApi.getSpecificCar(id).subscribe(data=>{
      console.log(data)
      this.editRowCar=data
    })
  }
  
  
}   
