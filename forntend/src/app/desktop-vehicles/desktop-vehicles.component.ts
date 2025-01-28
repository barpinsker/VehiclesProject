import { Component, OnInit } from '@angular/core';
import { Headers } from './headerTable';
import { RestApiService } from '../service/rest-api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-desktop-vehicles',
  templateUrl: './desktop-vehicles.component.html',
  styleUrls: ['./desktop-vehicles.component.scss'],
  standalone: false,
})
export class DesktopVehiclesComponent implements OnInit {
  constructor(private restApi: RestApiService) {}
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
    this.getAllCars('');
  }
  getAllCars(status: string) {
    this.restApi.getAllCars(`${status}`).subscribe(
      (data) => {
        this.carList = [...data];
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
