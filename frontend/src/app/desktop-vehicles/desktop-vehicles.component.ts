import { Component, OnInit } from '@angular/core';
import { Headers } from './headerTable';
import { RestApiService } from '../service/rest-api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-desktop-vehicles',
  templateUrl: './desktop-vehicles.component.html',
  styleUrls: ['./desktop-vehicles.component.scss'],
  standalone: false,
})
export class DesktopVehiclesComponent implements OnInit {
  constructor(private restApi: RestApiService,private toastr:ToastrService) {}
  carList: any[] = [];
  headers: any = new Headers().headerTable;
  headerInputsModel: any = new Headers().headerInputs;
  newCar: any = {};

  editRowCar: any = {};
  indexFilterActive: number = 0;
  statusCarFilter = [
    { name: 'all', value: '', active: true },
    { name: 'active', value: 'active', active: false },
    { name: 'inactive', value: 'inactive', active: false },
  ];

  ngOnInit(): void {
    var jsonValidaitor:any={}
    for(let header of this.headerInputsModel){
      jsonValidaitor[header.nameEnglish]=['', Validators.required]
      this.newCar[header.nameEnglish]=''
    }
    this.getAllCars('');
    
  }
  isFormValid(): boolean {
    return this.newCar.licensePlate !== '' && this.newCar.manufacturer !== '' && this.newCar.model !== '' && this.newCar.status !== '' && this.newCar.createdAt!=='';
  }
  getAllCars(status: string) {
    this.restApi.getAllCars(`${status}`).subscribe(
      (response) => {
        this.carList = [...response];
        for(let i of this.carList){
         i['updatedAt']=formatDate(i['updatedAt'],'dd-MM-yyyy','en')
         i['createdAt']=formatDate(i['createdAt'],'dd-MM-yyyy','en')
                }
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
  transform(value: string, flagType: string): void {
    let numbers: any = value.replace(/\D/g, ''); // שומר רק מספרים
    if (numbers.length > 3) {
      numbers =
        numbers.slice(0, 3) +
        '-' +
        numbers.slice(3, 5) +
        '-' +
        numbers.slice(5, 10);
    }
    if (flagType == 'new') {
      this.newCar['licensePlate'] = numbers;
    } else if (flagType == 'old') {
      this.editRowCar['licensePlate'] = numbers;
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
    this.newCar.id=Number(this.newCar.id)
    this.newCar.updatedAt = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.restApi.createNewCar(this.newCar).subscribe(
      (response:any) => {
        this.carList.push(this.newCar);
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
    this.restApi.updateCar(`${id}`, this.editRowCar).subscribe(
      (response) => {
        this.carList[this.carList.findIndex((car) => car.id === id)] =
          this.editRowCar;
        this.carList[this.carList.findIndex((car) => car.id === id)].updatedAt =
          formatDate(new Date(), 'yyyy-MM-dd', 'en');
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
