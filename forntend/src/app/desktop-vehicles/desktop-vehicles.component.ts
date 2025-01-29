import { Component, OnInit } from '@angular/core';
import { Headers } from './headerTable';
import { RestApiService } from '../service/rest-api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-desktop-vehicles',
  templateUrl: './desktop-vehicles.component.html',
  styleUrls: ['./desktop-vehicles.component.scss'],
  standalone: false,
})
export class DesktopVehiclesComponent implements OnInit {
  constructor(private restApi: RestApiService,private fb: FormBuilder) {}
  carList: any[] = [];
  headers: any = new Headers().headerTable;
  headerInputsModel: any = new Headers().headerInputs;
  newCar: any = {};
  myForm: FormGroup|any;
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
    this.myForm = this.fb.group({
      jsonValidaitor
    });
    this.getAllCars('');
    
  }
  isFormValid(): boolean {
    return this.newCar.licensePlate !== '' && this.newCar.manufacturer !== '' && this.newCar.model.trim() !== '' && this.newCar.status.trim() !== '' && this.newCar.createdAt.trim()!=='';
  }
  getAllCars(status: string) {
    this.restApi.getAllCars(`${status}`).subscribe(
      (data) => {
        this.carList = [...data];
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
    this.restApi.getSpecificCar(`${id}`).subscribe((data) => {
      this.editRowCar = data;
    });
  }
  createNewCar() {
    this.newCar.updatedAt = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.restApi.createNewCar(this.newCar).subscribe(
      (data) => {
        this.carList.push(this.newCar);
        this.newCar = {};
      },
      (error) => {
        console.log('לא ניתן להוסיף מכונית חדשה');
      }
    );
  }
  updateCar(id: string) {
    this.restApi.updateCar(`${id}`, this.editRowCar).subscribe(
      (data) => {
        this.carList[this.carList.findIndex((car) => car.id === id)] =
          this.editRowCar;
        this.carList[this.carList.findIndex((car) => car.id === id)].updatedAt =
          formatDate(new Date(), 'yyyy-MM-dd', 'en');
      },
      (error) => {
        console.log('לא ניתן לעדכן שורה זאת');
      }
    );
  }
  removeCar(id: string) {
    this.restApi.deleteCar(`${id}`).subscribe(
      (data) => {
        console.log('seccsess for delete car');
        const indexCarRemove = this.carList.findIndex((car) => car.id === id);
        if (indexCarRemove !== -1) {
          this.carList.splice(indexCarRemove, 1);
        }
      },
      (error) => {
        console.log('לא ניתן למחוק רכב זה');
      }
    );
  }
}
