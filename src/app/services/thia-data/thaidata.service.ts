import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Thaidata } from '../../modules/thai-data';

@Injectable({
  providedIn: 'root'
})
export class ThaidataService {
  private apiUrl = 'http://localhost:8080/api/thaidata/';

  constructor(private http: HttpClient) {}

  // getAllLocations(): Observable<Thaidata[]> {
  //   return this.http.get<Thaidata[]>(`${this.apiUrl}getAllLocations`);
  // }

  getProvinces(): Observable<Thaidata[]> {
    return this.http.get<Thaidata[]>(`${this.apiUrl}provinces`);
  }

  getAmphureByProvinceId(provinceId: string): Observable<Thaidata[]> {
    return this.http.get<Thaidata[]>(`${this.apiUrl}amphure/province=${provinceId}`)
  }

  getTambonByAmphureId(amphureId: string): Observable<Thaidata[]> {
    return this.http.get<Thaidata[]>(`${this.apiUrl}tambon/amphure=${amphureId}`)
  }

  getZipcodeByTambonId(tambonId: string): Observable<Thaidata[]> {
    return this.http.get<Thaidata[]>(`${this.apiUrl}zipcode/tambon=${tambonId}`)
  }

  // getAmphures(): Observable<Thaidata[]> {
  //   return this.http.get<Thaidata[]>(`${this.apiUrl}amphures`);
  // }

  // getTambons(): Observable<Thaidata[]> {
  //   return this.http.get<Thaidata[]>(`${this.apiUrl}tambons`);
  // }

  // getZipcodes(): Observable<Thaidata[]> {
  //   return this.http.get<Thaidata[]>(`${this.apiUrl}zipcodes`);
  // }
}
