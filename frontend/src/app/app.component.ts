import { Component } from '@angular/core';

import { Headers } from './desktop-vehicles//headerTable';
import { RestApiService } from './service/rest-api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
   constructor(private restApi: RestApiService,private toastr:ToastrService) {}
   title = 'forntend';
    carList: any[] = [];
    headers: any = new Headers().headerTable;
    headerInputsModel: any = new Headers().headerInputs;
    newCar: any = {};
 
  editRowCar: any = {};
  indexFilterActive: number = 0;
  statusCarFilter = [
    { name: 'all', value: 'empty', active: true },
    { name: 'active', value: 'active', active: false },
    { name: 'inactive', value: 'inactive', active: false },
  ];

  ngOnInit(): void {
    var jsonValidaitor:any={}
    for(let header of this.headerInputsModel){
      jsonValidaitor[header.nameEnglish]=['', Validators.required]
      this.newCar[header.nameEnglish]=''
      this.editRowCar[header.nameEnglish]=''
    }
    this.getAllCars('empty');
    
  }
  isFormValid(): boolean {
    return (this.newCar.licensePlate !== ''||this.editRowCar.licensePlate !== '') && (this.newCar.manufacturer !== ''||this.editRowCar.manufacturer !== '') && (this.newCar.model !== ''||this.editRowCar.model !== '') && (this.newCar.status !== ''||this.editRowCar.status !== '');
  }
  getAllCars(status: string) {
    this.restApi.getAllCars(`${status}`).subscribe(
      (response) => {
        console.log(response)
        this.carList = [...response];
       
      },
      (error) => {
        console.log('not found cars in a list');
      }
    );
  }
  selectFilter(indexRow: number) {
    this.statusCarFilter[indexRow].active = true;
    this.getAllCars(this.statusCarFilter[indexRow].value);
    if (this.indexFilterActive != indexRow) {
      this.statusCarFilter[this.indexFilterActive].active = false;
      this.indexFilterActive = indexRow;
    }
  }

  getNewId() {
    this.restApi.getNewId().subscribe((data) => {
      this.newCar['id'] = data;
    });
  }
  getSpecificCar(id: string) {
    this.restApi.getSpecificCar(`${id}`).subscribe((response) => {
      console.log(response)
      this.editRowCar = response.data;
    });
  }
  createNewCar() {
    this.newCar.createdAt = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.newCar.updatedAt = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.restApi.createNewCar({data:this.newCar}).subscribe(
      (response:any) => {
        this.carList.push(response.data);
        this.newCar = {};
        this.toastr.success(response.message,"Create Car")
      },
      (error) => {
        console.log(error)
        this.toastr.error(error.error.message,"Create Car")
      }
    );
  }
  updateCar(id: number) {
    this.editRowCar.updatedAt = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.restApi.updateCar(`${id}`, this.editRowCar).subscribe(
      (response) => {
        this.carList[this.carList.findIndex((car) => car.id === id)] =
          this.editRowCar;
      
        this.toastr.success(response.message,"Update Car")
      },
      (error) => {
        this.toastr.error(error.error.message,"Update Car")
       
      }
    );
  }
  removeCar(id: string) {
    this.restApi.deleteCar(`${id}`).subscribe(
      (response) => {
        const indexCarRemove = this.carList.findIndex((car) => car.id === id);
        if (indexCarRemove !== -1) {
          this.carList.splice(indexCarRemove, 1);
        }
        this.toastr.success(response.message,"Remove car")
      },
      
      (error) => {
        this.toastr.success(error.error.message,"Remove car")
      }
    );
  }
}
