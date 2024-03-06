import { User } from './../../modules/user';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone
  ) {}

  private apiUrl = 'http://localhost:8080/api/auth/';

  // ส่ง request เพื่อสร้างผู้ใช้ใหม่
  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  // ส่ง request เพื่อทำการ login
  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, user);
  }

  loggedIn() {
    const token: any = localStorage.getItem('token');
    // if (token !== null) {
    //   this._router.navigate(['/home'])
    // }
    return !!localStorage.getItem('token');
  }

  logoutedUser() {
    localStorage.removeItem('token');
    this._ngZone.run(() =>
      this._router.navigateByUrl('/login?logoutedUser=success')
    ); //เมื่อ navigate ไปที่ "" ให้แสเงข้อความนี้หน้า this.messageService.add({severity: 'success', summary: 'Success', detail: 'ลงทะเบียนสำเร็จ',});
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
