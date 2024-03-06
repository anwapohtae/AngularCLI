import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../modules/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user/';


  constructor(
    private http: HttpClient,
  ) {}

  // ส่ง request เพื่อเรียกข้อมูลผู้ใช้ทั้งหมด
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
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

  // ส่ง request เพื่ออัปเดตข้อมูลผู้ใช้
  updateUser(userId: any, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}${userId}`, user);
  }
}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyCrudService {
//   private apiUrl = 'http://your-api-url/api';

//   constructor(private http: HttpClient) { }

//   // Create Operation
//   create(data: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/resource`, data);
//   }

//   // Read Operation
//   getAll(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/resource`);
//   }

//   getById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/resource/${id}`);
//   }

//   // Update Operation
//   update(id: number, data: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/resource/${id}`, data);
//   }

//   // Delete Operation
//   delete(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/resource/${id}`);
//   }
// }
