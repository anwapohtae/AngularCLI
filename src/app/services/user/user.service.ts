import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user/';


  constructor(
    private http: HttpClient,
  ) {}

  // ส่ง request เพื่อเรียกข้อมูลผู้ใช้ทั้งหมด
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // ส่ง request เพื่อเรียกข้อมูลผู้ใช้ตาม ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${userId}`);
  }

  // // ส่ง request เพื่อเรียกข้อมูลผู้ใช้ตามอีเมล
  // getUserByEmail(email: string): Observable<any> {
  //   return this.http.get<any>(`http://your-api-url/users/email/${email}`);
  // }

  // // ส่ง request เพื่อลบผู้ใช้ตาม ID
  // deleteUser(userId: number): Observable<any> {
  //   return this.http.delete<any>(`http://your-api-url/users/${userId}`);
  // }

  // // ส่ง request เพื่ออัปเดตข้อมูลผู้ใช้
  // updateUser(userId: number, user: any): Observable<any> {
  //   return this.http.put<any>(`http://your-api-url/users/${userId}`, user);
  // }
}
