import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book/'

constructor(
  private http: HttpClient,
) { }
getAllBooks(): Observable<any> {
  return this.http.get(`${this.apiUrl}`)
}

}


