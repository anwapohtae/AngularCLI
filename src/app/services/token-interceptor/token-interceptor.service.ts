import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injectable,
    private authService: AuthService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ดำเนินการกับ request ที่ต้องการด้วยการเพิ่ม token หรือ headers อื่น ๆ ตามที่คุณต้องการ
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}` // แทน your_token_here ด้วย token ที่คุณต้องการใช้
      }
    });
    return next.handle(tokenizedReq);
  }
}
