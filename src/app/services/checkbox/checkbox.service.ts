import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  private apiUrl = 'http://localhost:8080/api/checkbox/';

  constructor(private http: HttpClient) {}

  getAllGender(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}gender`)
  }

  getAllPrefix(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}prefix`)
  }

  getAllPosition(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}position`)
  }

  getAllStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}status`)
  }




}
