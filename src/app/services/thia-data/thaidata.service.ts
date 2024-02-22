import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThaidataService {
  private apiUrl = 'http://localhost:8080/api/thaidata/';

  constructor(private http: HttpClient) {}

  getAllThaiData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
