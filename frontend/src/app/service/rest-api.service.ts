import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private apiUrl = 'http://localhost:3000/vehicle';
  constructor(private http: HttpClient) {}

  getAllCars(statusCar: string): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/data/allcars?active=${statusCar}`
    );
  }
  getSpecificCar(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getNewId(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/data/newId`);
  }
  createNewCar(newCar: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/create`, newCar);
  }
  updateCar(id: string, newData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, newData);
  }
  deleteCar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
