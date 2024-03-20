import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Rachkarn } from '../../modules/rachkarn';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RachkarnService {
  constructor(private http: HttpClient, _router: Router, _ngZone: NgZone) {}

  private apiUrl = 'http://localhost:8080/api/rachkarn/';

  createRachkarn(rachkarn: Rachkarn): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, rachkarn);
  }

  getAllRachkarn(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  GetRachkarnByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${userId}`)
  }
}
